import { configureStore } from '@reduxjs/toolkit';
import { baseApi, homeApi } from '@api';
import type { GetCategoriesResponse, Question } from '@types';

const createApiStore = () =>
  configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });

const createJsonResponse = (body: unknown, status = 200): Response => {
  const response = {
    ok: status >= 200 && status < 300,
    status,
    statusText: status >= 200 && status < 300 ? 'OK' : 'Server Error',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    text: jest.fn().mockResolvedValue(JSON.stringify(body)),
    clone: jest.fn(),
  } as unknown as Response;

  (response.clone as jest.Mock).mockReturnValue(response);
  return response;
};

describe('homeApi', () => {
  const fetchMock = jest.fn() as jest.MockedFunction<typeof fetch>;
  const originalFetch = globalThis.fetch;
  let apiStore: ReturnType<typeof createApiStore>;

  beforeAll(() => {
    jest.useFakeTimers();
    globalThis.fetch = fetchMock;
  });

  beforeEach(() => {
    apiStore = createApiStore();
  });

  afterEach(() => {
    apiStore.dispatch(baseApi.util.resetApiState());
    jest.runOnlyPendingTimers();
  });

  afterAll(() => {
    globalThis.fetch = originalFetch;
    jest.useRealTimers();
  });

  it('requests categories with the expected API contract', async () => {
    const response = {
      data: [{ id: 7, title: 'Herbs', rank: 1 }],
      meta: {
        pagination: { page: 1, pageSize: 25, pageCount: 1, total: 1 },
      },
    } as unknown as GetCategoriesResponse;
    fetchMock.mockResolvedValueOnce(createJsonResponse(response));

    const query = apiStore.dispatch(homeApi.endpoints.getCategories.initiate());

    await expect(query.unwrap()).resolves.toEqual(response);

    const request = fetchMock.mock.calls[0][0] as Request;
    expect(request.url).toBe('https://example.test/getCategories');
    expect(request.method).toBe('GET');
    expect(request.headers.get('Accept')).toBe('application/json');

    query.unsubscribe();
  });

  it('normalizes the questions array into the app response shape', async () => {
    const questions: Question[] = [
      {
        id: 3,
        title: 'How often should I water it?',
        subtitle: 'Watering',
        image_uri: 'https://example.test/watering.jpg',
        uri: 'https://example.test/articles/watering',
        order: 1,
      },
    ];
    fetchMock.mockResolvedValueOnce(createJsonResponse(questions));

    const query = apiStore.dispatch(homeApi.endpoints.getQuestions.initiate());

    await expect(query.unwrap()).resolves.toEqual({ data: questions });

    const request = fetchMock.mock.calls[0][0] as Request;
    expect(request.url).toBe('https://example.test/getQuestions');
    expect(request.method).toBe('GET');

    query.unsubscribe();
  });

  it('exposes an HTTP error to the query consumer', async () => {
    fetchMock.mockResolvedValueOnce(
      createJsonResponse({ message: 'Unexpected failure' }, 500),
    );

    const query = apiStore.dispatch(homeApi.endpoints.getCategories.initiate());

    await expect(query.unwrap()).rejects.toMatchObject({
      status: 500,
      data: { message: 'Unexpected failure' },
    });

    query.unsubscribe();
  });
});
