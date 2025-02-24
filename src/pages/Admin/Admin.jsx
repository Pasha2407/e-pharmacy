import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';

import { selectUserEmail } from '../../redux/auth/authSelectors';
import { currentThunk, logoutThunk } from '../../redux/auth/authServices';

import { AdminHeader } from 'components/AdminHeader/AdminHeader';
import { AdminSidebar } from 'components/AdminSidebar/AdminSidebar';
import s from './Admin.module.scss';

export const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userEmail = useSelector(selectUserEmail);

  useEffect(() => {
    dispatch(currentThunk());
  }, [dispatch]);

  const onLogout = () => {
    dispatch(logoutThunk());
    navigate('/');
  };

  return (
    <div className={s.container}>
      <AdminHeader userEmail={userEmail} onLogout={onLogout} />
      <main>
        <AdminSidebar />
        <Outlet />
      </main>
    </div>
  );
};
