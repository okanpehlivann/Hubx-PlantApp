import React, { useCallback, useState } from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ErrorBoundary, {
  type FallbackComponentProps,
} from 'react-native-error-boundary';
import { store } from '@store';
import { RootNavigator } from '@navigation';
import { AppErrorFallback } from '@components';

export default function App() {
  const [appKey, setAppKey] = useState<number>(0);
  const [shouldOpenHome, setShouldOpenHome] = useState<boolean>(false);

  const renderFallback = useCallback(
    ({ resetError }: FallbackComponentProps) => (
      <AppErrorFallback
        onGoHome={() => {
          setShouldOpenHome(true);
          resetError();
          setAppKey(key => key + 1);
        }}
      />
    ),
    [],
  );

  return (
    <ErrorBoundary
      FallbackComponent={renderFallback}
      onError={(error, componentStack) => {
        console.error('Unhandled application error', error, componentStack);
      }}
    >
      <Provider key={appKey} store={store}>
        <SafeAreaProvider>
          <RootNavigator startAtHome={shouldOpenHome} />
        </SafeAreaProvider>
      </Provider>
    </ErrorBoundary>
  );
}
