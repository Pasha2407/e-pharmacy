import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://localhost:4000',
});

export const getIncomeExpensesThunk = createAsyncThunk(
    '/getIncomeExpenses',
    async ({ limit = 6 }, thunkApi) => {
        const params = { limit };
        try {
            const { data } = await instance.get('/income-expenses', { params });
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    })