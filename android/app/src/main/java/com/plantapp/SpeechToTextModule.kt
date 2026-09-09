package com.plantapp

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.speech.RecognitionListener
import android.speech.RecognizerIntent
import android.speech.SpeechRecognizer
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import java.util.Locale

class SpeechToTextModule(
  private val reactContext: ReactApplicationContext,
) : ReactContextBaseJavaModule(reactContext), RecognitionListener {

  companion object {
    const val NAME = "SpeechToText"
    private const val EVENT_START = "speechStart"
    private const val EVENT_PARTIAL_RESULTS = "speechPartialResults"
    private const val EVENT_RESULTS = "speechResults"
    private const val EVENT_END = "speechEnd"
    private const val EVENT_ERROR = "speechError"
    private const val EVENT_AVAILABILITY_CHANGED = "speechAvailabilityChanged"
  }

  private val mainHandler = Handler(Looper.getMainLooper())
  private var speechRecognizer: SpeechRecognizer? = null
  private var isListening = false

  override fun getName(): String = NAME

  @ReactMethod
  fun requestPermission(promise: Promise) {
    val granted = ContextCompat.checkSelfPermission(
      reactContext,
      Manifest.permission.RECORD_AUDIO,
    ) == PackageManager.PERMISSION_GRANTED

    promise.resolve(granted)
  }

  @ReactMethod
  fun isAvailable(locale: String?, promise: Promise) {
    mainHandler.post {
      promise.resolve(SpeechRecognizer.isRecognitionAvailable(reactContext))
    }
  }

  @ReactMethod
  fun startListening(locale: String?, promise: Promise) {
    mainHandler.post {
      if (ContextCompat.checkSelfPermission(
          reactContext,
          Manifest.permission.RECORD_AUDIO,
        ) != PackageManager.PERMISSION_GRANTED
      ) {
        promise.reject("permission_denied", "Microphone permission is required.")
        return@post
      }

      if (!SpeechRecognizer.isRecognitionAvailable(reactContext)) {
        promise.reject("unavailable", "Speech recognition is not available.")
        return@post
      }

      try {
        speechRecognizer?.cancel()
        speechRecognizer?.destroy()
        speechRecognizer = SpeechRecognizer.createSpeechRecognizer(reactContext).also {
          it.setRecognitionListener(this)
        }

        val recognitionIntent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
          putExtra(
            RecognizerIntent.EXTRA_LANGUAGE_MODEL,
            RecognizerIntent.LANGUAGE_MODEL_FREE_FORM,
          )
          putExtra(
            RecognizerIntent.EXTRA_LANGUAGE,
            locale ?: Locale.getDefault().toLanguageTag(),
          )
          putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true)
          putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1)
          putExtra(RecognizerIntent.EXTRA_CALLING_PACKAGE, reactContext.packageName)
        }

        speechRecognizer?.startListening(recognitionIntent)
        isListening = true
        emit(EVENT_START)
        promise.resolve(null)
      } catch (exception: Exception) {
        isListening = false
        promise.reject("start_failed", exception.message, exception)
      }
    }
  }

  @ReactMethod
  fun stopListening(promise: Promise) {
    mainHandler.post {
      if (isListening) {
        speechRecognizer?.stopListening()
        isListening = false
      }
      promise.resolve(null)
    }
  }

  @ReactMethod
  fun addListener(eventName: String) {
    // Required by NativeEventEmitter on newer React Native versions.
  }

  @ReactMethod
  fun removeListeners(count: Int) {
    // Required by NativeEventEmitter on newer React Native versions.
  }

  override fun onReadyForSpeech(params: Bundle?) = Unit

  override fun onBeginningOfSpeech() = Unit

  override fun onRmsChanged(rmsdB: Float) = Unit

  override fun onBufferReceived(buffer: ByteArray?) = Unit

  override fun onEndOfSpeech() {
    isListening = false
    emit(EVENT_END)
  }

  override fun onError(error: Int) {
    isListening = false

    if (error == SpeechRecognizer.ERROR_NO_MATCH ||
      error == SpeechRecognizer.ERROR_SPEECH_TIMEOUT
    ) {
      emit(EVENT_END)
      return
    }

    val errorMap = Arguments.createMap().apply {
      putString("code", "android_$error")
      putString("message", errorMessage(error))
    }
    emit(EVENT_ERROR, errorMap)
    emit(EVENT_END)
  }

  override fun onResults(results: Bundle?) {
    val text = results
      ?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
      ?.firstOrNull()

    if (!text.isNullOrBlank()) {
      emitText(EVENT_RESULTS, text)
    }
    isListening = false
    emit(EVENT_END)
  }

  override fun onPartialResults(partialResults: Bundle?) {
    val text = partialResults
      ?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
      ?.firstOrNull()

    if (!text.isNullOrBlank()) {
      emitText(EVENT_PARTIAL_RESULTS, text)
    }
  }

  override fun onEvent(eventType: Int, params: Bundle?) = Unit

  private fun emitText(eventName: String, text: String) {
    val event = Arguments.createMap().apply {
      putString("text", text)
    }
    emit(eventName, event)
  }

  private fun emit(eventName: String, payload: com.facebook.react.bridge.WritableMap? = null) {
    if (!reactContext.hasActiveReactInstance()) {
      return
    }

    reactContext
      .getJSModule(RCTDeviceEventEmitter::class.java)
      .emit(eventName, payload)
  }

  private fun errorMessage(error: Int): String = when (error) {
    SpeechRecognizer.ERROR_AUDIO -> "Audio recording failed."
    SpeechRecognizer.ERROR_CLIENT -> "Speech recognition client error."
    SpeechRecognizer.ERROR_INSUFFICIENT_PERMISSIONS -> "Microphone permission is required."
    SpeechRecognizer.ERROR_NETWORK -> "Network error while recognizing speech."
    SpeechRecognizer.ERROR_NETWORK_TIMEOUT -> "Speech recognition network timeout."
    SpeechRecognizer.ERROR_RECOGNIZER_BUSY -> "Speech recognizer is busy."
    SpeechRecognizer.ERROR_SERVER -> "Speech recognition server error."
    else -> "Speech recognition failed."
  }
}
