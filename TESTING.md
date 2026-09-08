# Testing guide

This project uses Jest and React Native Testing Library. Tests should protect
observable behaviour and application contracts, not component internals.

## Test layers

- **Redux unit tests:** call reducers with actions and run async thunks against
  a fresh `setupStore`. Keep reducers pure and mock only external persistence.
- **RTK Query contract tests:** use a fresh store, mock `fetch`, and assert the
  request URL/method/headers plus app-owned response transformations and errors.
  Do not retest RTK Query's internal cache implementation.
- **UI unit tests:** render with React Native Testing Library and query by role,
  accessible name, or visible text. Exercise presses and state changes as a user
  would. Prefer these assertions over snapshots and component instance details.
- **App smoke tests:** verify that top-level providers are wired together while
  replacing native navigation with a narrow test double.

Keep tests isolated, use Arrange–Act–Assert, and give each test one behavioural
reason to fail. Shared native boundaries belong in `jest.setup.ts`; scenario data
and API responses should remain local to the relevant test.

Tests are colocated with the code they cover and use the `*.spec.ts` or
`*.spec.tsx` suffix (for example, `CustomButton.tsx` and
`CustomButton.spec.tsx` live in the same directory). Cross-screen welcome-flow
behaviour is covered by the colocated `GetStartedScreen.spec.tsx` and
`OnboardingScreen.spec.tsx` files; the root `App.spec.tsx` sits beside the root
`App.tsx`.

## Commands

```sh
npm test -- --runInBand
npm run test:watch
npm run test:coverage
npm run test:ci
npm run typecheck
npm run lint
```

`test:ci` is the deterministic CI command and includes coverage. Coverage scans
all application TypeScript, excluding styles, type-only files, static assets,
constants, and barrel exports so untested production behaviour remains visible.
The global 70% threshold prevents new untested code from silently lowering the
baseline; raise it as additional feature suites are added.

## Adding a feature

1. Cover state transitions and failure paths in the owning reducer/thunk.
2. Cover any API request or response transformation owned by the app.
3. Add a UI test for the main user-visible success, loading, and error paths.
4. Add accessible roles and names when the UI has no stable user-facing query.
5. Run tests, type checking, and lint before opening a pull request.
