import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from './accountSlice';

export const store = configureStore({
  reducer: {
    accounts: accountsReducer,
  },
});
