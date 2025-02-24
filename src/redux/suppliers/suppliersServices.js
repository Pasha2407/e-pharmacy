import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://localhost:4000',
});

export const getSuppliersThunk = createAsyncThunk(
    '/suppliers/getSuppliers',
    async ({ userName = '' }, thunkApi) => {
        const params = { userName };
        try {
            const { data } = await instance.get('/supplier', { params });
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    })