import Config from 'react-native-config';

const getRequiredValue = (key: string, value?: string): string => {
  const normalizedValue = value?.trim();

  if (!normalizedValue) {
    throw new Error(`[Environment] Missing required value: ${key}`);
  }

  return normalizedValue;
};

const normalizeBaseUrl = (url: string): string =>
  `${url.replace(/\/+$/, '')}/`;

export const ENVIRONMENT = Object.freeze({
  apiBaseUrl: normalizeBaseUrl(getRequiredValue('BASE_URL', Config.BASE_URL)),
});
