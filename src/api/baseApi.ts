import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENVIRONMENT } from '../config';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: ENVIRONMENT.apiBaseUrl,
    timeout: 15_000,
    prepareHeaders: headers => {
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Category', 'Question'],
  endpoints: () => ({}),
});
