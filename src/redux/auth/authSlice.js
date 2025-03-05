import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { registerThunk, loginThunk, logoutThunk, currentThunk } from './authServices';

const initialState = {
    isLoading: false,
    error: null,
    authenticated: false,
    token: null,
    userEmail: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setGoogleUser: (state, action) => {
            state.userEmail = action.payload.user.email;
            state.token = action.payload.user.token;
            state.authenticated = true;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(registerThunk.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.authenticated = true;
                state.token = payload.token;
            })
            .addCase(loginThunk.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.authenticated = true;
                state.token = payload.token;
            })
            .addCase(logoutThunk.fulfilled, () => {
                return initialState
            })
            .addCase(currentThunk.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.authenticated = true;
                state.userEmail = payload;
            })
            .addMatcher(
                isAnyOf(
                    registerThunk.pending,
                    loginThunk.pending,
                    logoutThunk.pending,
                    currentThunk.pending,
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
                    currentThunk.rejected,
                ),
                (state, { payload }) => {
                    state.isLoading = false;
                    state.error = payload;
                }
            )
    },
});

export const { setGoogleUser } = authSlice.actions;
export const authReducer = authSlice.reducer;