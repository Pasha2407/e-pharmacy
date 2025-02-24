import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { selectUserEmail } from '../../redux/auth/authSelectors';
import { currentThunk } from '../../redux/auth/authServices';
import { AdminHeader } from 'components/AdminHeader/AdminHeader';
import { AdminSidebar } from 'components/AdminSidebar/AdminSidebar';
import s from './Admin.module.scss';

export const Admin = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector(selectUserEmail);

  useEffect(() => {
    dispatch(currentThunk());
  }, [dispatch]);

  return (
    <div className={s.container}>
      <AdminHeader userEmail={userEmail} />
      <main>
        <AdminSidebar />
        <Outlet />
      </main>
    </div>
  );
};
