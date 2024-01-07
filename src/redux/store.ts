import { configureStore } from '@reduxjs/toolkit';
import GraphQLReducer from './slices/GraphQLSlice';

const store = configureStore({
  reducer: {
    graphQL: GraphQLReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
