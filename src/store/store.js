import { configureStore } from '@reduxjs/toolkit';
import appReducer  from './app.slice';
import errorReducer  from './errors.slice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    error: errorReducer,
  },
});