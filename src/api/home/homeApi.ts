import type {
  GetCategoriesResponse,
  GetQuestionsApiResponse,
  GetQuestionsResponse,
} from '@types';
import { baseApi, API_ROUTES } from '@api';
import { CACHE_TIME_SECONDS } from '@constants';

export const homeApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query<GetCategoriesResponse, void>({
      query: () => ({
        url: API_ROUTES.categories,
        method: 'GET',
      }),
      keepUnusedDataFor: CACHE_TIME_SECONDS,
      providesTags: result =>
        result
          ? [
              ...result.data.map(category => ({
                type: 'Category' as const,
                id: category.id,
              })),
              { type: 'Category' as const, id: 'LIST' },
            ]
          : [{ type: 'Category' as const, id: 'LIST' }],
    }),
    getQuestions: builder.query<GetQuestionsResponse, void>({
      query: () => ({
        url: API_ROUTES.questions,
        method: 'GET',
      }),
      transformResponse: (
        response: GetQuestionsApiResponse,
      ): GetQuestionsResponse => ({
        data: response,
      }),
      keepUnusedDataFor: CACHE_TIME_SECONDS,
      providesTags: result =>
        result
          ? [
              ...result.data.map(question => ({
                type: 'Question' as const,
                id: question.id,
              })),
              { type: 'Question' as const, id: 'LIST' },
            ]
          : [{ type: 'Question' as const, id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCategoriesQuery,
  useLazyGetCategoriesQuery,
  useGetQuestionsQuery,
  useLazyGetQuestionsQuery,
} = homeApi;
