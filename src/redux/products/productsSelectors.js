export const selectGetProducts = state => state.products.productsData;
export const selectProductsIsLoading = state => state.products.isLoading;
export const selectProductsError = state => state.products.error;
export const selectProductsPage = state => state.products.page;
export const selectProductName = state => state.products.fieldName;
export const selectGetTotalProducts = state => state.products.totalProducts;