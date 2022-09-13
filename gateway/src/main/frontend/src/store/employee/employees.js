import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import employeeApi from '../../api/employee/employeeApi';

const initialState = {
    loading: true,
    dataEmployees: [],
    dataPosition: [],
    dataHrbyDepartment: [],
    dataUrbyDepartment: [],
    dataEmployeebyId: '',
    dataEmployeesBySearch: [],
}

export const fetchPosition = createAsyncThunk(
    'employee/fetchPosition', 
    async () => {
        const res = await employeeApi.getAllPositon();
        return res;
  });

  export const fetchNameHrbyDeparment = createAsyncThunk(
    'employee/fetchNameHrbyDeparment', 
    async () => {
        const res = await employeeApi.getDataNameHr();
        return res;
  });

  export const fetchDataEmployeebyId = createAsyncThunk(
    'employee/fetchDataEmployeebyId', 
    async (id) => {
        const res = await employeeApi.getDataEmployeeByID(id);
        return res;
  });
  
  export const fetchNameUrbyDeparment = createAsyncThunk(
    'employee/fetchNameUrbyDeparment', 
    async (id) => {
        const res = await employeeApi.getDataNameUrByDepatmentId(id);
        return res;
  });

  export const fetchUpdateEmployee = createAsyncThunk(
    'employee/fetchUpdateEmployee', 
    async (data) => {
        const res = await employeeApi.updateDataEmployee(data);
        return res;
  });

    export const fetchEmployeeBySearch = createAsyncThunk(
    'employee/fetchBySearch',
    async (data) => {
        const response = await employeeApi.findEmpByTextSearch(data.page, data.size, data.keyTxtSearch, data.keyPosition, data.keyDepartment, data.keyGroup);
        return response;
    }
    );

    export const fetchEmployee = createAsyncThunk(
        'employee/fetch',
        async (data) => {
            const response = await employeeApi.getDataEmployee(data.page, data.size);
            return response;
        }
    );

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        addEmployee: (state, action) => {
            state.loading = true;
        },
        
        listEmployee: (state, action) => {
            state.dataEmployees = action.payload;
        },

        listEmployeeBySearch: (state, action) => {
            state.dataEmployeesBySearch = action.payload;
        },

        setPosition: (state, action) => {
            state.dataPosition = action.payload;
        },

        setHr: (state, action) => {
            state.dataHrbyDepartment = action.payload;
        },

        setUr: (state, action) => {
            state.dataUrbyDepartment = action.payload;
        },

        setDataEmployeebyId: (state, action) => {
            state.dataEmployeebyId = action.payload;
        },
        resetList: (state, action) => {
            state.dataUrbyDepartment = [];
            // state.dataHrbyDepartment = [];
            
            // state.dataEmployees = [];
          
            // state.dataEmployeebyId = '';
            // state.dataEmployeesBySearch =[];
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchEmployee.fulfilled, (state, action) => {
          state.loading = false;
          state.dataEmployees = action.payload;
        })
        .addCase(fetchEmployeeBySearch.fulfilled, (state, action) => {
            state.loading = false;
            state.dataEmployeesBySearch = action.payload;
          })
        .addCase(fetchPosition.fulfilled, (state, action) => {
            state.loading = false;
            state.dataPosition = action.payload;
        })
        .addCase(fetchNameHrbyDeparment.fulfilled, (state, action) => {
            state.loading = false;
            state.dataHrbyDepartment = action.payload;
        })
        .addCase(fetchNameUrbyDeparment.fulfilled, (state, action) => {
            state.loading = false;
            state.dataUrbyDepartment = action.payload;
        })
        .addCase(fetchDataEmployeebyId.fulfilled, (state, action) => {
            state.loading = false;
            state.dataEmployeebyId = action.payload;
        })
       
      },
})

export const { addEmployee, setPosition, listEmployee, resetList } = employeeSlice.actions;

export default employeeSlice.reducer;
