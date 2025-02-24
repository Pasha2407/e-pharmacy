import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logoutThunk } from '../../redux/auth/authServices';
import pageTitles from '../../shared/data/pageTitles.json';
import s from './AdminHeader.module.scss';

export const AdminHeader = ({ userEmail }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getPageTitle = () => pageTitles[location.pathname] || 'Dashboard';

  const onLogout = () => {
    dispatch(logoutThunk());
    navigate('/');
  };

  return (
    <header className={s.header}>
      <button className={s.burgerButton}></button>
      <div className={s.logo}></div>
      <div className={s.title}>
        <h1>Medicine store</h1>
        <span>
          {getPageTitle()} | {userEmail?.userEmail || 'Guest'}
        </span>
      </div>
      <button onClick={onLogout} className={s.logout}></button>
    </header>
  );
};
