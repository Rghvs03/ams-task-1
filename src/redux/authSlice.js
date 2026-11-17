import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'actify_auth_user';

export const SYSTEM_USERS = [
  {
    id: 'usr-admin',
    name: 'Admin User',
    email: 'admin@actifyzone.com',
    password: 'admin@123',
    role: 'admin',
    label: 'Admin',
  },
  {
    id: 'usr-se1',
    name: 'Sales Executive 1',
    email: 'se1@actifyzone.com',
    password: 'se1@123',
    role: 'sales_exec',
    label: 'Sales Executive 1',
  },
  {
    id: 'usr-se2',
    name: 'Sales Executive 2',
    email: 'se2@actifyzone.com',
    password: 'se2@123',
    role: 'sales_exec',
    label: 'Sales Executive 2',
  },
];

const loadUserFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const matched = SYSTEM_USERS.find((u) => u.id === parsed?.id);
    return matched || null;
  } catch {
    return null;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: loadUserFromStorage(),
    users: SYSTEM_USERS,
  },
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload));
      } catch (err) {
        console.error(err);
      }
    },
    logout: (state) => {
      state.currentUser = null;
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (err) {
        console.error(err);
      }
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectAllUsers = (state) => state.auth.users;
export const selectIsAdmin = (state) => state.auth.currentUser?.role === 'admin';

export default authSlice.reducer;
