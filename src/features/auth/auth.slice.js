import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from '../../plugin/axios';

export const authLogin = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await http.post('/auth/login', payload);
    return data;
  } catch (err) {
    rejectWithValue(err);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authIsLoggedIn: null,
    authToken: null,
    authLoading: false
  },
  reducers: {
    authLogout: (state) => {
      state.authIsLoggedIn = false;
      state.authToken = null;
    }
  },
  extraReducers: {
    [authLogin.pending]: (state) => {
      state.authLoading = true;
    },
    [authLogin.fulfilled]: (state, { payload }) => {
      state.authLoading = false;
      state.authToken = payload.accessToken;
      state.authIsLoggedIn = true;
    },
    [authLogin.rejected]: (state) => {
      state.authLoading = false;
      state.authToken = null;
    }
  }
});

export const { authLogout } = authSlice.actions;

export default authSlice.reducer;
