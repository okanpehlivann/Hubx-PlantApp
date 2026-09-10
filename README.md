# PlantApp — React Native Case Study

## 🎥 Demo Video

<table>
  <tr>
    <td width="50%">
      <video src="https://github.com/user-attachments/assets/c82747f6-12dc-46b4-b1d1-b813d595b500" width="100%" controls></video>
    </td>
    <td width="50%">
      <video src="https://github.com/user-attachments/assets/36ae67eb-fef6-45ac-81a0-f943cb0bdf06" width="100%" controls></video>
    </td>
  </tr>
</table>

## Overview

PlantApp is a React Native plant discovery and identification app built from
the provided case-study design. It includes an onboarding flow, a paywall and
a data-driven home experience for exploring plant guides, questions and
categories.

The project is written in TypeScript and uses reusable components, typed
navigation, Redux Toolkit and native platform integrations where they improve
the experience.

## Assignment Requirements

The original case-study requirements are covered as follows:

| Requirement                     | Implementation                                                                           |
| ------------------------------- | ---------------------------------------------------------------------------------------- |
| React / React Native            | React Native `0.87.1` app for iOS and Android                                            |
| TypeScript and Redux            | TypeScript, Redux Toolkit and typed Redux hooks                                          |
| Pixel-accurate, responsive UI   | Reusable design-system components, shared constants, custom fonts and responsive layouts |
| API-driven data                 | RTK Query endpoints for categories and questions                                         |
| Onboarding flow                 | Welcome, onboarding slides and paywall screens                                           |
| Home flow                       | Home content, plant guides, categories and bottom-tab navigation                         |
| Persisted onboarding completion | AsyncStorage persistence for completed onboarding                                        |
| Git and maintainability         | Typed props, feature-oriented folders, reusable components and colocated tests           |

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
- Recoverable application-level error boundary

### Additional enhancements

The following improvements were added to make the app more complete and
reusable:

- Shared `BottomSheet` component for Terms of Use and Privacy Policy content
- Clearable search input with keyboard-friendly behaviour
- Native speech-to-text search using a reusable `useSpeechToText` hook
- Custom iOS and Android native speech modules instead of a speech-to-text library
- Press-and-hold microphone interaction that writes recognized speech into search
- Home-only guided feature tour for search, voice search, plant guides and scan
- Custom spotlight tour built with React Native `Modal` and `react-native-svg`
- Accessibility labels and screen-reader announcements for interactive features
- Cleaner absolute imports through shared `@` aliases such as `@components`,
  `@screens`, `@store`, `@api` and `@context`, configured in TypeScript and
  Babel
- Reusable `HomeTourContext` for feature-tour targets

### Feature previews

<table>
  <tr>
    <th align="center">Error Boundary</th>
    <th align="center">Open Camera</th>
    <th align="center">Native Bridge Mic</th>
    <th align="center">Tour Guide</th>
    <th align="center">Bottom Sheet</th>
  </tr>
  <tr valign="middle">
    <td align="center">
      <img src="https://github.com/user-attachments/assets/888f1d56-18cf-4fe2-b080-e569cfbe96e3" alt="Error boundary fallback" height="360" />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/40e665a9-399e-40be-a11e-dd85d1206f28" alt="Camera flow" height="80" />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/9951e226-3a22-4407-9fd4-621db38552d4" alt="Native speech bridge" height="60" />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/1973b70f-dc90-4b23-b0af-7665698ff472" alt="Guided feature tour" height="360" />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/d9eec785-dc17-4042-a18b-f97ab82250f2" alt="Bottom sheet" height="360" />
    </td>
  </tr>
</table>

## User Flows

### First launch

```text
Launch
  → Get Started
  → Onboarding
  → Paywall
  → Home
```

After onboarding is completed, its status is saved locally. Future launches
open the main application directly.

### Home experience

```text
Home
  → Search plant guides and categories
  → Press and hold the microphone for voice search
  → Browse question cards and categories
  → Open the scan flow from the camera tab button
```

The Home feature tour is shown once and its completion state is also saved
locally.

## Technical Architecture

### State and data

- Redux Toolkit manages application state.
- RTK Query manages API requests, caching, loading states and refetching.
- AsyncStorage persists onboarding and feature-tour completion state.
- Typed Redux hooks keep dispatching and state selection type-safe.

### Navigation

- The root navigator selects the onboarding or main flow after local-state
  hydration.
- Native stack navigation handles the onboarding and main stacks.
- Bottom tabs provide the main application navigation.

### Native speech-to-text

Speech recognition is exposed through a small shared React Native API:

- iOS: `SFSpeechRecognizer`, `AVAudioEngine` and `AVAudioSession`
- Android: Android `SpeechRecognizer` and `RecognitionListener`
- JavaScript: `useSpeechToText` subscribes to native events and exposes a
  platform-independent hook API

Microphone permissions are declared in the iOS `Info.plist` and Android
manifest. Voice search is best tested on a physical device because simulator
microphone and speech-service behaviour can vary.

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

### Install dependencies

From the project root, install the JavaScript dependencies:

```sh
npm install
```

Verify that the root `.env` file contains the API base URL shown above before
starting the application.

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

Run the test suite and quality checks with:

```sh
npm test -- --runInBand
npm run test:ci
npm run typecheck
npm run lint
```

For detailed testing conventions, see [`TESTING.md`](./TESTING.md).
