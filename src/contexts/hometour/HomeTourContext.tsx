import React, {
  createContext,
  type PropsWithChildren,
  type RefObject,
  useContext,
  useMemo,
  useRef,
} from 'react';
import type { ViewInstance } from 'react-native';

type HomeTourContextValue = {
  scanButtonRef: RefObject<ViewInstance | null>;
  isAvailable: boolean;
};

const HomeTourContext = createContext<HomeTourContextValue | null>(null);

export const HomeTourProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const scanButtonRef = useRef<ViewInstance>(null);
  const value = useMemo(
    () => ({ scanButtonRef, isAvailable: true }),
    [scanButtonRef],
  );

  return (
    <HomeTourContext.Provider value={value}>
      {children}
    </HomeTourContext.Provider>
  );
};

export const useHomeTourTargets = (): HomeTourContextValue => {
  const context = useContext(HomeTourContext);
  const fallbackScanButtonRef = useRef<ViewInstance>(null);

  return (
    context ?? {
      scanButtonRef: fallbackScanButtonRef,
      isAvailable: false,
    }
  );
};
