import { configureStore } from '@reduxjs/toolkit';

import { allReducer } from './all-reducers';
export const store = configureStore({
  reducer: allReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof allReducer>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
