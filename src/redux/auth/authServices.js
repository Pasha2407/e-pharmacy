import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://localhost:4000',
});

const setToken = token => {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const registerThunk = createAsyncThunk(
    '/auth/register',
    async (formData, thunkApi) => {
        try {
            const { data } = await instance.post('/auth/register', formData);
            setToken(data.token);
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const loginThunk = createAsyncThunk(
    '/auth/login',
    async (formData, thunkApi) => {
        try {
            const { data } = await instance.post('/auth/login', formData);
            setToken(data.token);
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const logoutThunk = createAsyncThunk(
    '/auth/logout',
    async (_, thunkApi) => {
        try {
            await instance.post('/auth/logout');
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const currentThunk = createAsyncThunk(
    '/auth/current',
    async (_, thunkApi) => {
        try {
            const state = thunkApi.getState();
            const token = state.auth.token;
            setToken(token);
            const { data } = await instance.get('/auth/email');

            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    },
    {
        condition: (_, thunkApi) => {
            const state = thunkApi.getState();
            const token = state.auth.token;
            if (!token) return false;
            else return true;
        },
    }
);