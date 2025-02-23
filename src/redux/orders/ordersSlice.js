import { createSlice } from "@reduxjs/toolkit";
import { getOrdersThunk } from "./ordersServices";

const initialState = {
    ordersData: null,
    isLoading: false,
    error: null,
    fieldName: '',
    page: 1,
};

const ordersSlice = createSlice({
    name: 'orders',
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
            .addCase(getOrdersThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getOrdersThunk.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.ordersData = payload.orders;
            })
            .addCase(getOrdersThunk.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
    },
});

export const { setName, setPage } = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;