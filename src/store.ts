import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import articlesReducer from './slices/articles';
import {articlesApi} from './services/articles';

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(articlesApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;