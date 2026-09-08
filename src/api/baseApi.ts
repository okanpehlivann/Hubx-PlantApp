import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENVIRONMENT } from '../config';
import { API_TIMEOUT_MS } from '@constants';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: ENVIRONMENT.apiBaseUrl,
    timeout: API_TIMEOUT_MS,
    prepareHeaders: headers => {
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Category', 'Question'],
  endpoints: () => ({}),
});
