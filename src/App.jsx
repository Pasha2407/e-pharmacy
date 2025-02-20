import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Welcome } from 'pages/Welcome/Welcome';
import { Admin } from 'pages/Admin/Admin';
import { Dashboard } from 'pages/Dashboard/Dashboard';
import { Orders } from 'pages/Orders/Orders';
import { Products } from 'pages/Products/Products';
import { Suppliers } from 'pages/Suppliers/Suppliers';
import { Customers } from 'pages/Customers/Customers';

export const App = () => {
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
