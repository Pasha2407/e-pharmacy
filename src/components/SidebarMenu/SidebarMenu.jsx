import { useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

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
import burgerActive from 'shared/icons/burgerActive.svg';
import logout from 'shared/images/logout.png';
import { logoutThunk } from '../../redux/auth/authServices';
import s from './SidebarMenu.module.scss';

const navItems = [
  { path: 'dashboard', icons: { default: dashboard, active: dashboardActive } },
  { path: 'orders', icons: { default: orders, active: ordersActive } },
  { path: 'products', icons: { default: products, active: productsActive } },
  { path: 'suppliers', icons: { default: suppliers, active: suppliersActive } },
  { path: 'customers', icons: { default: customers, active: customersActive } },
];

export const SidebarMenu = ({ setShowSidebar }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.removeAttribute('style');
    };
  }, []);

  const onLogout = async () => {
    await dispatch(logoutThunk());
    navigate('/');
  };

  return (
    <div className={s.wrapper}>
      <aside className={s.sidebar}>
        <div className={s.closeButton} onClick={() => setShowSidebar(false)}>
          <img src={burgerActive} alt={'icon'}></img>
        </div>
        <div className={s.links}>
          {navItems.map(({ path, icons }) => (
            <NavLink key={path} to={path}>
              <img
                src={pathname.includes(path) ? icons.active : icons.default}
                alt="icon"
              />
            </NavLink>
          ))}
        </div>
        <div onClick={onLogout} className={s.logout}>
          <img src={logout} alt={'logout'}></img>
        </div>
      </aside>
    </div>
  );
};
