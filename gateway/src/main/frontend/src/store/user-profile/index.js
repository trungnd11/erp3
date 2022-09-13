/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Storage } from "../../utils/storage-utils";
import { serializeAxiosError } from "../reducer.utils";

const initialState = {
  userInfo: null,
  error: "",
  loading: false,
};

// Actions

export const getUserInfo = createAsyncThunk(
  "get_user_info",
  async () => axios.get("/hr/api/v1/employee/current"),
  {
    serializeError: serializeAxiosError,
  }
);

export const AuthenticationSlice = createSlice({
  name: "user_info",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserInfo.rejected, (state, action) => {
          console.log(action)
       return ({
            ...state,
            error: "get user info error",
            loading:false
          })
      })
      .addCase(getUserInfo.fulfilled, (state, action) => ({
        ...state,
        userInfo: action.payload,
        loading:false
      }))
      .addCase(getUserInfo.pending, (state,action) => {
         
        state.loading = true;
      });
  },
});

// Reducer
export default AuthenticationSlice.reducer;
