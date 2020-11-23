import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveToken(state, { payload }: PayloadAction<string>) {
      debugger;
      if (payload) {
        state.token = payload;
        console.log("payload are given" , state)
      }
    },
    clearToken(state) {
      state.token = null;
    },
    setAuthState(state, { payload }: PayloadAction<boolean>) {
      state.isAuthenticated = payload;
        console.log("sdsds" , state.isAuthenticated)
    },
  },
});

export const { saveToken, clearToken, setAuthState } = auth.actions;

export default auth.reducer;
