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

export const addProductThunk = createAsyncThunk(
    '/products/addProduct',
    async (formData, thunkApi) => {
        try {
            const { data } = await instance.post('/product', formData);
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    })

export const editProductThunk = createAsyncThunk(
    '/products/editProduct',
    async ({ id, formData }, thunkApi) => {
        try {
            const { data } = await instance.put(`/product/${id}`, formData);
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    })

export const deleteProductThunk = createAsyncThunk(
    '/products/deleteProduct',
    async (id, thunkApi) => {
        try {
            const { data } = await instance.patch(`/product/${id}/delete`);
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    })