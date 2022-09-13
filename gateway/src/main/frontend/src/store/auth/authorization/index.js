import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import produce from 'immer';
import { serializeAxiosError } from '../../reducer.utils';

const initialState = {
  loading: false,
  roles: null,
  privileges: null,
  message: null,
};

export const getRoles = createAsyncThunk(
  'getRoles',
  () => axios.get('/auth/api/v1/role'),
  {
    serializeError: serializeAxiosError,
  },
);

export const getPrivileges = createAsyncThunk(
  'getPrivileges',
  () => axios.get('/auth/api/v1/privilege'),
  {
    serializeError: serializeAxiosError,
  },
);

export const RolesSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setRole: (state, action) => {
      const nextState = produce(state, (draft) => {
        const updated = draft.roles;
        const target = updated.find((item) => item.id === action.payload.id);
        target.privileges = action.payload.privileges;
      });
      return { ...nextState };
    },
    addNewRole: (state, action) => {
      state.roles.push(action.payload);
    },
    addNewPrivilege: (state, action) => {
      state.privileges.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(getRoles.rejected, (state, action) => ({
      ...state,
      message: action.payload.data.message || action.error.message,
      loading: false,
    }))
      .addCase(getRoles.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        roles: action.payload.data,
        message: action.payload.message,
      }))
      .addCase(getRoles.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(getPrivileges.rejected, (state, action) => ({
        ...state,
        message: action.payload.message || action.error.message,
        loading: false,
      }))
      .addCase(getPrivileges.fulfilled, (state, action) => ({
        ...state,
        message: action.payload.message,
        privileges: action.payload.data,
        loading: false,
      }))
      .addCase(getPrivileges.pending, (state) => ({
        ...state,
        message: '',
        loading: true,
      }));
  },
});

export const { setRole, addNewRole, addNewPrivilege } = RolesSlice.actions;

export default RolesSlice.reducer;
