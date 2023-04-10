import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Article from '../types/Article';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BASE_URL}),
  endpoints: builder => ({
    listArticles: builder.query<Article[], void>({
      query: () => 'test-articles-v4.json',
    }),
  }),
});

export const {useListArticlesQuery} = api;
