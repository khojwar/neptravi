import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  user: any | null
  token: string | null
  hydrated: boolean
}

const initialState: AuthState = {
  user: null,
  token: null,
  hydrated: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    rehydrateAuth(state, action: PayloadAction<{ user: any; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.hydrated = true;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.hydrated = true;
    },
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.hydrated = true;
    },
  },
});

export const { loginSuccess, logout, rehydrateAuth } = authSlice.actions;
export default authSlice.reducer;
