export const selectGetCustomers = state => state.customers.customersData;
export const selectCustomersIsLoading = state => state.customers.isLoading;
export const selectCustomersError = state => state.customers.error;
export const selectCustomersPage = state => state.customers.page;
export const selectCustomersUserName = state => state.customers.fieldName;