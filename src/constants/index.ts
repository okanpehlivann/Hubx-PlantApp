import { COLORS, SIZES, SPACING } from './theme';
import { SCREEN_NAMES } from './screenNames';
import { STORAGE_KEYS } from './storageKeys';
import {
  CAMERA_OPTIONS,
  CAMERA_PERMISSION_TITLE,
  CAMERA_PERMISSION_MESSAGE,
} from './camera';
import { FONTS } from './fonts';
import { ONBOARDING_SLIDES, OnboardingSlide } from './onboardingSlides';
import { EVENTS, nativeSpeechToText, createSpeechError } from './speechtotext';
import {
  PAYWALL_FEATURES,
  PAYWALL_PLANS,
  PaywallFeature,
  PaywallPlan,
} from './paywallData';
import { CACHE_TIME_SECONDS } from './home';
import { API_TIMEOUT_MS } from './api';
import { LEGAL_CONTENT, LegalDocument } from './legal';

export {
  COLORS,
  SIZES,
  SPACING,
  SCREEN_NAMES,
  STORAGE_KEYS,
  FONTS,
  LEGAL_CONTENT,
  CAMERA_OPTIONS,
  CAMERA_PERMISSION_TITLE,
  CAMERA_PERMISSION_MESSAGE,
};
export {
  ONBOARDING_SLIDES,
  PAYWALL_FEATURES,
  PAYWALL_PLANS,
  CACHE_TIME_SECONDS,
  API_TIMEOUT_MS,
  EVENTS,
  nativeSpeechToText,
  createSpeechError,
};
export type { OnboardingSlide, PaywallFeature, PaywallPlan };
export type { LegalDocument };
