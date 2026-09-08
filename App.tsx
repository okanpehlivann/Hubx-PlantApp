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
  const [appKey, setAppKey] = useState(0);

  const renderFallback = useCallback(
    ({ resetError }: FallbackComponentProps) => (
      <AppErrorFallback
        onRetry={() => {
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
          <RootNavigator />
        </SafeAreaProvider>
      </Provider>
    </ErrorBoundary>
  );
}
