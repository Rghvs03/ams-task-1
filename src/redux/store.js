import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from './accountSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    accounts: accountsReducer,
    auth: authReducer,
  },
});
