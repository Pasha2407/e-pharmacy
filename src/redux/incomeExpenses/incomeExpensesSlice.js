import { createSlice } from "@reduxjs/toolkit";
import { getIncomeExpensesThunk } from "./incomeExpensesServices";

const initialState = {
    incomeExpensesData: null,
    isLoading: false,
    error: null,
};

const incomeExpensesSlice = createSlice({
    name: 'incomeExpenses',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getIncomeExpensesThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getIncomeExpensesThunk.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.incomeExpensesData = payload.list;
            })
            .addCase(getIncomeExpensesThunk.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
    },
});

export const incomeExpensesReducer = incomeExpensesSlice.reducer;