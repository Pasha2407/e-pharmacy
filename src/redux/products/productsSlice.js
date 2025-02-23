import { createSlice } from "@reduxjs/toolkit";
import { getProductsThunk } from "./productsServices";

const initialState = {
    productsData: null,
    isLoading: false,
    error: null,
    productName: '',
    page: 1,
};

const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        setProductName(state, action) {
            state.productName = action.payload.productName;
            state.page = 1;
        },
        setPage(state, action) {
            state.page = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getProductsThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getProductsThunk.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.productsData = payload.products;
            })
            .addCase(getProductsThunk.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
    },
});

export const { setProductName, setPage } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;