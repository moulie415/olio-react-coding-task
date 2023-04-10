import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface ArticlesState {
  readArticles: {[key: number]: boolean};
}

const initialState = {} as ArticlesState;

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    markAsRead(state, action: PayloadAction<number>) {
      state.readArticles = {...state.readArticles, [action.payload]: true};
    },
    markAsUnread(state, action: PayloadAction<number>) {
      state.readArticles = {...state.readArticles, [action.payload]: false};
    },
  },
});

export const {markAsRead, markAsUnread} = articlesSlice.actions;
export default articlesSlice.reducer;
