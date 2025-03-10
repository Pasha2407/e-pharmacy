import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getProductsThunk, addProductThunk } from "./productsServices";

const initialState = {
    productsData: null,
    isLoading: false,
    error: null,
    fieldName: '',
    page: 1,
    totalProducts: 60,
};

const productsSlice = createSlice({
    name: 'products',
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
            .addCase(getProductsThunk.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.productsData = payload.products;
                state.totalProducts = payload.totalProducts;
            })
            .addCase(addProductThunk.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.productsData = [...state.productsData, payload.product];
            })
            .addMatcher(
                isAnyOf(
                    getProductsThunk.pending,
                    addProductThunk.pending,
                ),
                state => {
                    state.isLoading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                isAnyOf(
                    getProductsThunk.rejected,
                    addProductThunk.rejected,
                ),
                (state, { payload }) => {
                    state.isLoading = false;
                    state.error = payload;
                }
            )
    },
});

export const { setName, setPage } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;