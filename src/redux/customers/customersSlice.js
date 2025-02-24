import { createSlice } from "@reduxjs/toolkit";
import { getCustomersThunk } from "./customersServices";

const initialState = {
    customersData: null,
    isLoading: false,
    error: null,
    fieldName: '',
    page: 1,
};

const customersSlice = createSlice({
    name: 'customers',
    initialState: initialState,
    reducers: {
        setName(state, action) {
            state.fieldName = action.payload.fieldName;
            state.page = 1;
        },
        setPage(state, action) {
            state.page = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getCustomersThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getCustomersThunk.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.customersData = payload.customers;
            })
            .addCase(getCustomersThunk.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
    },
});

export const { setName, setPage } = customersSlice.actions;
export const customersReducer = customersSlice.reducer;