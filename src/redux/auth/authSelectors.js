export const selectUserEmail = state => state.auth.userEmail;
export const selectAuthenticated = state => state.auth.authenticated;
export const selectAuthIsLoading = state => state.auth.isLoading;
export const selectAuthError = state => state.auth.error;