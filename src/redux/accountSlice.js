import { createSlice } from '@reduxjs/toolkit';
import { initialAccounts } from './mockData';

const STORAGE_KEY = 'actify_accounts_v2';

// Helper to safely load data from LocalStorage or fallback to mockData
const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialAccounts));
      return initialAccounts;
    }
    const parsed = JSON.parse(raw);
    // Auto-migrate: If stored data is empty or lacks assignedTo mapping, re-seed with latest mock data
    if (!Array.isArray(parsed) || parsed.length === 0 || !parsed[0]?.assignedTo) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialAccounts));
      return initialAccounts;
    }
    return parsed;
  } catch (error) {
    console.error('Failed to load from LocalStorage:', error);
    return initialAccounts;
  }
};

// Helper to persist state changes
const saveToStorage = (list) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (error) {
    console.error('Failed to save to LocalStorage:', error);
  }
};

const accountsSlice = createSlice({
  name: 'accounts',
  initialState: {
    list: loadFromStorage(),
  },
  reducers: {
    addAccount: (state, action) => {
      // Put newly created account at the very top of the list
      state.list.unshift(action.payload);
      saveToStorage(state.list);
    },
    updateAccount: (state, action) => {
      const index = state.list.findIndex((acc) => acc.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload };
        saveToStorage(state.list);
      }
    },
    deleteAccount: (state, action) => {
      state.list = state.list.filter((acc) => acc.id !== action.payload);
      saveToStorage(state.list);
    },
    resetAccounts: (state) => {
      state.list = initialAccounts;
      saveToStorage(initialAccounts);
    }
  },
});

export const { addAccount, updateAccount, deleteAccount, resetAccounts } = accountsSlice.actions;

// Selectors for easy state consumption
export const selectAllAccounts = (state) => state.accounts.list;

// Scopes accounts based on active user role:
// - Admin sees all accounts
// - Sales Executives only see accounts assigned to them
export const selectScopedAccounts = (state) => {
  const user = state.auth?.currentUser;
  const list = state.accounts.list;
  if (!user || user.role === 'admin') {
    return list;
  }
  return list.filter((acc) => acc.assignedTo === user.label);
};

export default accountsSlice.reducer;