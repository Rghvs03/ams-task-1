import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from './accountSlice';
import authReducer from './authSlice';
import crmReducer from './crmSlice';

export const store = configureStore({
  reducer: {
    accounts: accountsReducer,
    auth: authReducer,
    crm: crmReducer,
  },
});
