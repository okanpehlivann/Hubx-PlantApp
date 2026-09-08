const mockAsyncStorage = {
  getItem: jest.fn(async () => null),
  setItem: jest.fn(async () => undefined),
  removeItem: jest.fn(async () => undefined),
  mergeItem: jest.fn(async () => undefined),
  clear: jest.fn(async () => undefined),
  getAllKeys: jest.fn(async () => []),
  multiGet: jest.fn(async () => []),
  multiSet: jest.fn(async () => undefined),
  multiRemove: jest.fn(async () => undefined),
  multiMerge: jest.fn(async () => undefined),
};

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: mockAsyncStorage,
}));

jest.mock('react-native-config', () => ({
  BASE_URL: 'https://example.test/',
}));

jest.mock(
  'react-native-safe-area-context',
  () => jest.requireActual('react-native-safe-area-context/jest/mock').default,
);
