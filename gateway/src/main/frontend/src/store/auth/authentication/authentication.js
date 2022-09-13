/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Storage } from '../../../utils/storage-utils';
import { serializeAxiosError } from '../../reducer.utils';

export const AUTH_TOKEN_KEY = 'authenticationToken';
export const IS_AUTHENTICATED_KEY = 'isAuthenticated';
export const ACCOUNT_KEY = 'account';

const initialState = {
  loading: false,
  isAuthenticated: false,
  loginSuccess: false,
  loginError: false, // Errors returned from server side
  showModalLogin: false,
  account: null,
  errorMessage: null, // Errors returned from server side
  redirectMessage: null,
  sessionHasBeenFetched: false,
  logoutUrl: null,
};

// Actions

export const getSession = () => (dispatch, getState) => {
  dispatch(getAccount());
};

export const getAccount = createAsyncThunk(
  'authentication/get_account',
  async () => axios.get('/auth/api/v1/authenticate/account'),
  {
    serializeError: serializeAxiosError,
  },
);

export const authenticate = createAsyncThunk(
  'authentication/login',
  async (auth) => axios.post('/auth/api/v1/authenticate', auth),
  {
    serializeError: serializeAxiosError,
  },
);

export const login = (username, password, rememberMe = false) => async (dispatch) => {
  const result = await dispatch(authenticate({ username, password, rememberMe }));
  const response = result.payload;
  const bearerToken = response?.token;
  if (bearerToken) {
    Storage.local.set(AUTH_TOKEN_KEY, bearerToken);
  }
  dispatch(getSession());
};

export const clearAuthToken = () => {
  if (Storage.local.get(AUTH_TOKEN_KEY)) {
    Storage.local.remove(AUTH_TOKEN_KEY);
    Storage.local.remove(IS_AUTHENTICATED_KEY);
    Storage.local.remove(ACCOUNT_KEY);
  }
  if (Storage.session.get(AUTH_TOKEN_KEY)) {
    Storage.session.remove(AUTH_TOKEN_KEY);
    Storage.local.remove(IS_AUTHENTICATED_KEY);
    Storage.local.remove(ACCOUNT_KEY);
  }
};

export const logout = () => (dispatch) => {
  clearAuthToken();
  dispatch(logoutSession());
};

export const clearAuthentication = (messageKey) => (dispatch) => {
  clearAuthToken();
  dispatch(authError(messageKey));
  dispatch(clearAuth());
};

export const AuthenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    logoutSession() {
      return {
        ...initialState,
        showModalLogin: true,
      };
    },
    authError(state, action) {
      return {
        ...state,
        showModalLogin: true,
        redirectMessage: action.payload,
      };
    },
    clearAuth(state) {
      return {
        ...state,
        loading: false,
        showModalLogin: true,
        isAuthenticated: false,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(authenticate.rejected, (state, action) => ({
        ...state,
        errorMessage: action.error.message,
        showModalLogin: true,
        loginError: true,
      }))
      .addCase(authenticate.fulfilled, (state) => ({
        ...state,
        loading: false,
        loginError: false,
        showModalLogin: false,
        loginSuccess: true,
      }))
      .addCase(getAccount.rejected, (state, action) => ({
        ...state,
        loading: false,
        isAuthenticated: false,
        sessionHasBeenFetched: true,
        showModalLogin: true,
        errorMessage: action.error.message,
      }))
      .addCase(getAccount.fulfilled, (state, action) => {
        console.log(action);
        const isAuthenticated = action.payload && action.payload.data && action.payload.data.active;
        Storage.local.set(IS_AUTHENTICATED_KEY, isAuthenticated);
        Storage.local.set(ACCOUNT_KEY, action.payload.data);
        return {
          ...state,
          isAuthenticated,
          loading: false,
          sessionHasBeenFetched: true,
          account: action.payload.data,
        };
      })
      .addCase(authenticate.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAccount.pending, (state) => {
        state.loading = true;
      });
  },
});

export const { logoutSession, authError, clearAuth } = AuthenticationSlice.actions;

// Reducer
export default AuthenticationSlice.reducer;
