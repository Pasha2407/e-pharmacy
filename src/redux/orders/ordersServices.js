import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://localhost:4000',
});

export const getOrdersThunk = createAsyncThunk(
    '/orders/getOrders',
    async ({ userName = '', page = 1, limit = 5 }, thunkApi) => {
        const params = {
            userName,
            page,
            limit,
        };
        try {
            const { data } = await instance.get('/order', { params });
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    })