module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@context': './src/contexts',
          '@constants': './src/constants',
          '@enums': './src/enums',
          '@hooks': './src/hooks',
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@store': './src/store',
          '@api': './src/api',
          '@types': './src/types',
          '@assets': './src/assets',
        },
      },
    ],
  ],
};
