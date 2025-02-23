import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://localhost:4000',
});

export const getProductsThunk = createAsyncThunk(
    '/products/getProducts',
    async ({ productName = '', page = 1, limit = 5 }, thunkApi) => {
        const params = {
            productName,
            page,
            limit,
        };
        try {
            const { data } = await instance.get('/product', { params });
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    })