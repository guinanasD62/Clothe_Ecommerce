// src/features/session/sessionSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  username: string;
  email: string;
  phone: string;
  address: string;
  img?: string;
  isAdmin?: boolean;
  isActive?: boolean;
}

interface SessionState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: SessionState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string; user: User }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    clearSession(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, clearSession } = sessionSlice.actions;

export default sessionSlice.reducer;
