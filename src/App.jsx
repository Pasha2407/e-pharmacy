import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { currentThunk } from './redux/auth/authServices';
import { selectAuthenticated } from './redux/auth/authSelectors';
import { Welcome } from 'pages/Welcome/Welcome';
import { Admin } from 'pages/Admin/Admin';
import { Dashboard } from 'pages/Dashboard/Dashboard';
import { Orders } from 'pages/Orders/Orders';
import { Products } from 'pages/Products/Products';
import { Suppliers } from 'pages/Suppliers/Suppliers';
import { Customers } from 'pages/Customers/Customers';
import { useDispatch, useSelector } from 'react-redux';

export const App = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector(selectAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(currentThunk());
  }, [dispatch]);

  useEffect(() => {
    if (location.pathname === '/' && authenticated) {
      navigate('/admin/dashboard');
    }
  }, [navigate, location, authenticated]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="customers" element={<Customers />} />
        </Route>
        <Route path="*" element={<Welcome />} />
      </Routes>
    </div>
  );
};
