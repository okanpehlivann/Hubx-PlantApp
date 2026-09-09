# PlantApp – React Native Case Study

## 🎥 Demo Video

> **Coming soon** — this section is reserved for the final screen recording.
>
> Add the video link here when the recording is ready.

## Overview

PlantApp is a React Native plant discovery and identification experience built
from the provided case-study design. The application includes an onboarding
flow, a paywall screen and a data-driven home screen for discovering plant
guides and categories.

The implementation is written in TypeScript and follows a reusable,
component-based structure with typed navigation, Redux state management and
native platform integrations where they improve the user experience.

## Assignment Requirements

The original case-study requirements are covered as follows:

| Requirement | Implementation |
| --- | --- |
| React / React Native | React Native `0.87.1` application for iOS and Android |
| TypeScript and Redux | TypeScript throughout the application with Redux Toolkit and typed hooks |
| Pixel-accurate, responsive UI | Reusable design-system components, shared constants, custom fonts and responsive layouts based on the provided Figma design |
| API-driven data | RTK Query endpoints for categories and questions |
| Onboarding flow | Welcome, onboarding slides and paywall screens |
| Home flow | Home content, horizontal plant guides, categories and bottom tab navigation |
| Persisted onboarding completion | AsyncStorage persistence prevents completed users from re-entering onboarding |
| Git and maintainability | Meaningful names, typed props, feature-oriented folders and colocated tests |

## Implemented Features

### Core case-study flow

- Welcome / Get Started screen
- Two onboarding slides
- Paywall screen with monthly and yearly subscription options
- Home screen with greeting, search, premium banner, questions and categories
- Bottom tab navigation for Home, Diagnose, My Garden, Scan and Profile
- Loading, empty and error states for API-backed content
- Pull-to-refresh on the home content
- Search filtering for plant questions and categories
- Persistent onboarding state across app launches
- Error boundary with a recoverable home action

### Additional enhancements

These items were not required as separate deliverables in the case description,
but were added to make the application more complete and reusable:

- Shared `BottomSheet` component for Terms of Use and Privacy Policy content
- Clearable search input with keyboard-friendly behaviour
- Native speech-to-text search using a reusable `useSpeechToText` hook
- Custom iOS and Android native speech modules instead of a speech-to-text library
- Press-and-hold microphone interaction that writes recognized speech into search
- Home-only guided feature tour for search, voice search, plant guides and scan
- Custom spotlight tour built with React Native `Modal` and `react-native-svg`
- Accessibility labels and screen-reader announcements for interactive features
- Reusable `@context` alias and `HomeTourContext` for feature-tour targets

Calling these out separately keeps the original requirements easy to verify
while also showing the additional product and engineering decisions made
during implementation.

## User Flows

### First launch

```text
Launch
  → Get Started
  → Onboarding
  → Paywall
  → Home
```

After the onboarding flow is completed, the status is persisted locally and
the user is taken directly to the main application on future launches.

### Home experience

```text
Home
  → Search plant guides and categories
  → Press and hold the microphone for voice search
  → Browse question cards and categories
  → Open the scan flow from the camera tab button
```

The Home feature tour is shown once and its completion state is also persisted
locally.

## Technical Architecture

### State and data

- Redux Toolkit manages application state.
- RTK Query manages API requests, caching, loading states and refetching.
- AsyncStorage persists onboarding and feature-tour completion state.
- Typed Redux hooks keep dispatching and state selection type-safe.

### Navigation

- A root navigator selects the onboarding or main flow after local state
  hydration.
- Native stack navigation handles the onboarding and main stacks.
- Bottom tabs provide the main application navigation.

### Native speech-to-text

Speech recognition is exposed through a small shared React Native API:

- iOS: `SFSpeechRecognizer`, `AVAudioEngine` and `AVAudioSession`
- Android: Android `SpeechRecognizer` and `RecognitionListener`
- JavaScript: `useSpeechToText` subscribes to native events and exposes a
  platform-independent hook API

The microphone permission declarations are included in the iOS
`Info.plist` and Android manifest. Voice search is best tested on a physical
device because simulator microphone and speech-service behaviour can vary.

### Guided feature tour

The feature tour is implemented in the project without a dedicated tour
library. A transparent `Modal` provides the overlay, `react-native-svg` draws
the spotlight mask, and target components expose refs that are measured with
`measureInWindow`. This keeps the tour reusable while allowing the Home screen
to define its own steps and copy.

## Project Structure

```text
src/
├── api/          RTK Query base API and Home endpoints
├── assets/       Fonts, images and SVG icons
├── components/   Reusable UI components
├── config/       Environment configuration
├── constants/    Design, legal, navigation and storage constants
├── contexts/     Shared React contexts
├── hooks/        Reusable application hooks
├── navigation/   Root stack and main tab navigation
├── screens/      Welcome, onboarding, paywall, Home and tab screens
├── store/        Redux store, slice and typed hooks
└── types/        Shared TypeScript contracts

ios/              iOS native project and speech module
android/          Android native project and speech module
```

## API and Design References

### API

The app reads its base URL from `BASE_URL` in `.env`:

```env
BASE_URL=https://dummy-api-jtg6bessta-ey.a.run.app
```

Available endpoints:

- Categories: `GET /getCategories`
- Questions: `GET /getQuestions`

### Figma

[Open the provided Figma design](https://www.figma.com/file/EBocQLQi7YnoZxpSBTfAy8/iOS-Case?node-id=0%3A1)

## Getting Started

### Prerequisites

- Node.js `22.11.0` or newer
- Xcode and CocoaPods for iOS development
- Android Studio and an Android SDK for Android development
- A configured React Native development environment

Install JavaScript dependencies from the project root:

```sh
npm install
```

Make sure `.env` contains the API base URL shown above before starting the
application.

### Start Metro

```sh
npm start
```

### Run on Android

```sh
npm run android
```

### Run on iOS

On the first iOS setup, or after native dependency changes:

```sh
bundle install
cd ios
bundle exec pod install
cd ..
```

Then run the app:

```sh
npm run ios
```

## Testing and Quality Checks

The project uses Jest and React Native Testing Library. Tests focus on
observable behaviour, state transitions, API contracts and user interactions.

```sh
npm test -- --runInBand
npm run test:ci
npm run typecheck
npm run lint
```

More detailed testing conventions are documented in
[`TESTING.md`](./TESTING.md).

## Notes

- The assignment design and copy are reproduced in English to match the
  provided screens.
- The API is a dummy API supplied for the case study, so production data
  persistence and authentication are outside the scope of this project.
- The video section at the top is intentionally left as a placeholder for the
  final walkthrough recording.
