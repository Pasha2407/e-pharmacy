import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

import { authReducer } from './auth/authSlice';
import { ordersReducer } from './orders/ordersSlice';
import { productsReducer } from './products/productsSlice';
import { suppliersReducer } from './suppliers/suppliersSlice';
import { customersReducer } from './customers/customersSlice';

const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token'],
};

export const reducer = {
    auth: persistReducer(authPersistConfig, authReducer),
    orders: ordersReducer,
    products: productsReducer,
    suppliers: suppliersReducer,
    customers: customersReducer
};