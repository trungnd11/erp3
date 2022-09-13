/* eslint-disable array-callback-return */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/department";

const initialState = {
  loading: true,
  filter: "",
  departmentDetail: "",
  departmentTree: [],
};

export const departments = createAsyncThunk("department/fetList", async () => {
  const res = await api.getDepartment();
  return res;
});

const Organizational = createSlice({
  name: "organizational",
  initialState,
  reducers: {
    showDetailPartOrg: (state, action) => {
      state.departmentDetail = state.departmentTree.find(
        (item) => item.id === action.payload
      );
    },

    filterOrg: (state, action) => {
      state.departmentTree.filter(({ name }) => name.includes(action.payload));
    },

    showDetailPart: (state, action) => {
      return {
        ...state,
        departmentDetail: action.payload,
      };
    },
    viewPartDefault: (state, action) => {
      state.departmentDetail = state.departmentTree[0];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(departments.fulfilled, (state, action) => {
      state.loading = false;
      state.departmentTree = action.payload;
    });
  },
});

export const { showDetailPartOrg, showDetailPart, viewPartDefault, filterOrg } =
  Organizational.actions;

export default Organizational.reducer;
