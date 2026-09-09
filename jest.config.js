module.exports = {
  preset: '@react-native/jest-preset',
  clearMocks: true,
  restoreMocks: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(svg)$': '<rootDir>/__mocks__/svgMock.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation|react-redux|react-native-error-boundary|react-native-image-picker|react-native-permissions|immer)/)',
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/*.styles.{ts,tsx}',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/types.ts',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/assets/**',
    '!<rootDir>/src/constants/**',
    '!<rootDir>/src/enums/**',
    '!<rootDir>/src/types/**',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  watchman: false,
};
