import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { registerThunk, loginThunk, logoutThunk } from './authServices';

const initialState = {
    isLoading: false,
    error: null,
    authenticated: false,
    token: null,
    userData: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(registerThunk.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.authenticated = true;
                state.token = payload.token;
                state.userData = payload.user;
            })
            .addCase(loginThunk.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.authenticated = true;
                state.token = payload.token;
                state.userData = payload.user;
            })
            .addCase(logoutThunk.fulfilled, () => {
                return initialState
            })
            .addMatcher(
                isAnyOf(
                    registerThunk.pending,
                    loginThunk.pending,
                    logoutThunk.pending,
                ),
                state => {
                    state.isLoading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                isAnyOf(
                    registerThunk.rejected,
                    loginThunk.rejected,
                    logoutThunk.rejected,
                ),
                (state, { payload }) => {
                    state.isLoading = false;
                    state.error = payload;
                }
            )
    },
});

export const authReducer = authSlice.reducer;