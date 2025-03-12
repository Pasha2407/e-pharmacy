import { NavLink, useLocation } from 'react-router-dom';

import dashboard from 'shared/icons/dashboard.svg';
import dashboardActive from 'shared/icons/dashboardActive.svg';
import orders from 'shared/icons/orders.svg';
import ordersActive from 'shared/icons/ordersActive.svg';
import products from 'shared/icons/products.svg';
import productsActive from 'shared/icons/productsActive.svg';
import suppliers from 'shared/icons/suppliers.svg';
import suppliersActive from 'shared/icons/suppliersActive.svg';
import customers from 'shared/icons/customers.svg';
import customersActive from 'shared/icons/customersActive.svg';
import s from './AdminSidebar.module.scss';

const navItems = [
  { path: 'dashboard', icons: { default: dashboard, active: dashboardActive } },
  { path: 'orders', icons: { default: orders, active: ordersActive } },
  { path: 'products', icons: { default: products, active: productsActive } },
  { path: 'suppliers', icons: { default: suppliers, active: suppliersActive } },
  { path: 'customers', icons: { default: customers, active: customersActive } },
];

export const AdminSidebar = () => {
  const { pathname } = useLocation();

  return (
    <aside className={s.sidebar}>
      {navItems.map(({ path, icons }) => (
        <NavLink key={path} to={path}>
          <img
            src={pathname.includes(path) ? icons.active : icons.default}
            alt="icon"
          />
        </NavLink>
      ))}
    </aside>
  );
};
