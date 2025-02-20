import { NavLink } from 'react-router-dom';

import s from './AdminSidebar.module.scss';

export const AdminSidebar = () => {
  return (
    <aside className={s.sidebar}>
      <NavLink to="dashboard">D</NavLink>
      <NavLink to="orders">O</NavLink>
      <NavLink to="products">P</NavLink>
      <NavLink to="suppliers">S</NavLink>
      <NavLink to="customers">C</NavLink>
    </aside>
  );
};
