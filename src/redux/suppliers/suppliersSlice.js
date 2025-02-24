import { createSlice } from "@reduxjs/toolkit";
import { getSuppliersThunk } from "./suppliersServices";

const initialState = {
    suppliersData: null,
    isLoading: false,
    error: null,
    fieldName: '',
};

const suppliersSlice = createSlice({
    name: 'suppliers',
    initialState: initialState,
    reducers: {
        setName(state, action) {
            state.fieldName = action.payload.fieldName;
            state.page = 1;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getSuppliersThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getSuppliersThunk.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.suppliersData = payload.suppliers;
            })
            .addCase(getSuppliersThunk.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
    },
});

export const { setName, setPage } = suppliersSlice.actions;
export const suppliersReducer = suppliersSlice.reducer;