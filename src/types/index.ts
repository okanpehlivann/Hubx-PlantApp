import type { LaunchScreenProps } from './launchscreen';
import type { HomeContentProps } from './api/homescreen';
import type { CameraPermissionStatus, UseCameraResult } from './camera';
import type {
  SpeechToTextStatus,
  SpeechToTextError,
  NativeSpeechToTextModule,
  SpeechEvent,
  UseSpeechToTextOptions,
  UseSpeechToTextResult,
} from './speechtotext';
import type {
  GetStartedNavigationProp,
  MainTabParamList,
  OnboardingNavigationProp,
  RootStackParamList,
  RootNavigatorProps,
} from './navigation';

export type {
  LaunchScreenProps,
  GetStartedNavigationProp,
  OnboardingNavigationProp,
  MainTabParamList,
  RootStackParamList,
  RootNavigatorProps,
  HomeContentProps,
  SpeechToTextStatus,
  SpeechToTextError,
  NativeSpeechToTextModule,
  SpeechEvent,
  UseSpeechToTextOptions,
  UseSpeechToTextResult,
};
export type { CameraPermissionStatus, UseCameraResult };

export type {
  BaseResponse,
  PaginatedResponse,
  Pagination,
  PaginationMeta,
  Category,
  CategoryImage,
  CategoryImageFormat,
  GetCategoriesResponse,
  Question,
  GetQuestionsApiResponse,
  GetQuestionsResponse,
} from './api';
