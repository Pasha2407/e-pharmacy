import { Outlet } from 'react-router-dom';

import { AdminSidebar } from 'components/AdminSidebar/AdminSidebar';
import s from './Admin.module.scss';

export const Admin = () => {
  return (
    <div className={s.container}>
      <main>
        <AdminSidebar />
        <Outlet />
      </main>
    </div>
  );
};
