import { IMAGES } from '@assets';
import { ONBOARDING_SLIDE_ID } from '@enums';
import { ImageSourcePropType } from 'react-native';

export interface OnboardingSlide {
  id: ONBOARDING_SLIDE_ID;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  image: ImageSourcePropType;
  backgroundImage?: ImageSourcePropType;
  artwork?: ImageSourcePropType;
}

export const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    id: ONBOARDING_SLIDE_ID.IDENTIFY,
    titlePrefix: 'Take a photo to ',
    titleHighlight: 'identify',
    titleSuffix: ' the plant!',
    image: IMAGES.onboardingFirst,
  },
  {
    id: ONBOARDING_SLIDE_ID.CARE_GUIDES,
    titlePrefix: 'Get plant ',
    titleHighlight: 'care guides',
    titleSuffix: '',
    image: IMAGES.onboardingTwoPhone,
    backgroundImage: IMAGES.onboardingTwoBackground,
    artwork: IMAGES.onboardingTwoArtwork,
  },
];
