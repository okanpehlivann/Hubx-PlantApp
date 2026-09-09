#import <AVFoundation/AVFoundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <Speech/Speech.h>

@interface SpeechToTextModule : RCTEventEmitter <SFSpeechRecognizerDelegate>

@property(nonatomic, strong) AVAudioEngine *audioEngine;
@property(nonatomic, strong) SFSpeechRecognizer *speechRecognizer;
@property(nonatomic, strong) SFSpeechAudioBufferRecognitionRequest *recognitionRequest;
@property(nonatomic, strong) SFSpeechRecognitionTask *recognitionTask;
@property(nonatomic, assign) BOOL isListening;
@property(nonatomic, assign) BOOL hasEmittedEnd;
@property(nonatomic, assign) NSUInteger recognitionSessionID;

@end

@implementation SpeechToTextModule

RCT_EXPORT_MODULE(SpeechToText);

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[
    @"speechStart",
    @"speechPartialResults",
    @"speechResults",
    @"speechEnd",
    @"speechError",
    @"speechAvailabilityChanged"
  ];
}

RCT_EXPORT_METHOD(requestPermission:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  AVAudioSession *audioSession = [AVAudioSession sharedInstance];
  void (^requestSpeechPermission)(void) = ^{
    [SFSpeechRecognizer requestAuthorization:^(SFSpeechRecognizerAuthorizationStatus status) {
      dispatch_async(dispatch_get_main_queue(), ^{
        if (status == SFSpeechRecognizerAuthorizationStatusAuthorized) {
          resolve(@YES);
        } else {
          reject(@"permission_denied", @"Speech recognition permission is required.", nil);
        }
      });
    }];
  };

  if (audioSession.recordPermission == AVAudioSessionRecordPermissionGranted) {
    requestSpeechPermission();
    return;
  }

  [audioSession requestRecordPermission:^(BOOL granted) {
    dispatch_async(dispatch_get_main_queue(), ^{
      if (!granted) {
        reject(@"permission_denied", @"Microphone permission is required.", nil);
        return;
      }
      requestSpeechPermission();
    });
  }];
}

RCT_EXPORT_METHOD(isAvailable:(NSString *)localeIdentifier
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  NSString *identifier = localeIdentifier.length > 0
    ? localeIdentifier
    : ([[NSLocale preferredLanguages] firstObject] ?: @"en-US");
  SFSpeechRecognizer *recognizer = [[SFSpeechRecognizer alloc]
                                    initWithLocale:[[NSLocale alloc] initWithLocaleIdentifier:identifier]];
  resolve(@(recognizer.isAvailable));
}

RCT_EXPORT_METHOD(startListening:(NSString *)localeIdentifier
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  AVAudioSession *audioSession = [AVAudioSession sharedInstance];

  if ([SFSpeechRecognizer authorizationStatus] != SFSpeechRecognizerAuthorizationStatusAuthorized) {
    reject(@"permission_denied", @"Speech recognition permission is required.", nil);
    return;
  }

  if (audioSession.recordPermission != AVAudioSessionRecordPermissionGranted) {
    reject(@"permission_denied", @"Microphone permission is required.", nil);
    return;
  }

  [self cancelCurrentRecognition];
  NSUInteger sessionID = self.recognitionSessionID;

  NSString *identifier = localeIdentifier.length > 0
    ? localeIdentifier
    : ([[NSLocale preferredLanguages] firstObject] ?: @"en-US");
  self.speechRecognizer = [[SFSpeechRecognizer alloc]
                           initWithLocale:[[NSLocale alloc] initWithLocaleIdentifier:identifier]];
  self.speechRecognizer.delegate = self;

  if (!self.speechRecognizer.isAvailable) {
    reject(@"unavailable", @"Speech recognition is not available.", nil);
    return;
  }

  NSError *audioError = nil;
  [audioSession setCategory:AVAudioSessionCategoryRecord
                        mode:AVAudioSessionModeMeasurement
                     options:AVAudioSessionCategoryOptionDuckOthers
                       error:&audioError];
  if (audioError != nil || ![audioSession setActive:YES error:&audioError]) {
    reject(@"audio_session_failed", audioError.localizedDescription ?: @"Audio session could not be started.", audioError);
    return;
  }

  self.audioEngine = [[AVAudioEngine alloc] init];
  self.recognitionRequest = [[SFSpeechAudioBufferRecognitionRequest alloc] init];
  self.recognitionRequest.shouldReportPartialResults = YES;

  __weak SpeechToTextModule *weakSelf = self;
  self.recognitionTask = [self.speechRecognizer
                          recognitionTaskWithRequest:self.recognitionRequest
                          resultHandler:^(SFSpeechRecognitionResult *result, NSError *error) {
    SpeechToTextModule *strongSelf = weakSelf;
    if (strongSelf == nil) {
      return;
    }

    // A cancelled iOS recognition task may still deliver a delayed callback.
    // Never let a previous press/release cycle affect the current one.
    if (strongSelf.recognitionSessionID != sessionID) {
      return;
    }

    if (result != nil) {
      NSString *text = result.bestTranscription.formattedString ?: @"";
      [strongSelf sendEventWithName:(result.isFinal ? @"speechResults" : @"speechPartialResults")
                                body:@{ @"text": text }];
    }

    if (error != nil) {
      if (strongSelf.isListening) {
        [strongSelf emitError:error];
      }
      [strongSelf finishListening];
      return;
    }

    if (result.isFinal) {
      [strongSelf finishListening];
    }
  }];

  AVAudioInputNode *inputNode = self.audioEngine.inputNode;
  AVAudioFormat *recordingFormat = [inputNode outputFormatForBus:0];
  [inputNode installTapOnBus:0
                   bufferSize:1024
                       format:recordingFormat
                        block:^(AVAudioPCMBuffer *buffer, AVAudioTime *when) {
    SpeechToTextModule *strongSelf = weakSelf;
    if (strongSelf != nil && strongSelf.recognitionSessionID == sessionID) {
      [strongSelf.recognitionRequest appendAudioPCMBuffer:buffer];
    }
  }];

  [self.audioEngine prepare];
  NSError *engineError = nil;
  if (![self.audioEngine startAndReturnError:&engineError]) {
    [self cancelCurrentRecognition];
    reject(@"audio_engine_failed", engineError.localizedDescription ?: @"Audio engine could not be started.", engineError);
    return;
  }

  self.isListening = YES;
  self.hasEmittedEnd = NO;
  [self sendEventWithName:@"speechStart" body:nil];
  resolve(nil);
}

RCT_EXPORT_METHOD(stopListening:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  if (!self.isListening && self.recognitionRequest == nil) {
    resolve(nil);
    return;
  }

  [self finishListening];
  [self.recognitionTask finish];
  resolve(nil);
}

- (void)speechRecognizer:(SFSpeechRecognizer *)speechRecognizer
     availabilityDidChange:(BOOL)available
{
  [self sendEventWithName:@"speechAvailabilityChanged" body:@{ @"available": @(available) }];
}

- (void)finishListening
{
  if (self.audioEngine.isRunning) {
    [self.audioEngine stop];
  }

  if (self.audioEngine.inputNode != nil) {
    [self.audioEngine.inputNode removeTapOnBus:0];
  }

  [self.recognitionRequest endAudio];
  self.isListening = NO;

  if (!self.hasEmittedEnd) {
    self.hasEmittedEnd = YES;
    [self sendEventWithName:@"speechEnd" body:nil];
  }

  [[AVAudioSession sharedInstance] setActive:NO
                                  withOptions:AVAudioSessionSetActiveOptionNotifyOthersOnDeactivation
                                        error:nil];
}

- (void)cancelCurrentRecognition
{
  self.recognitionSessionID += 1;

  if (self.audioEngine.isRunning) {
    [self.audioEngine stop];
  }
  if (self.audioEngine.inputNode != nil) {
    [self.audioEngine.inputNode removeTapOnBus:0];
  }
  [self.recognitionTask cancel];
  [self.recognitionRequest endAudio];
  self.audioEngine = nil;
  self.recognitionRequest = nil;
  self.recognitionTask = nil;
  self.isListening = NO;
  self.hasEmittedEnd = NO;
  [[AVAudioSession sharedInstance] setActive:NO error:nil];
}

- (void)emitError:(NSError *)error
{
  [self sendEventWithName:@"speechError"
                     body:@{
                       @"code": [NSString stringWithFormat:@"ios_%ld", (long)error.code],
                       @"message": error.localizedDescription ?: @"Speech recognition failed."
                     }];
}

@end
