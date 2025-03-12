import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import logo from 'shared/images/logo.png';
import logout from 'shared/images/logout.png';
import burger from 'shared/icons/burger.svg';
import { logoutThunk } from '../../redux/auth/authServices';
import pageTitles from '../../shared/data/pageTitles.json';
import s from './AdminHeader.module.scss';
import { SidebarMenu } from 'components/SidebarMenu/SidebarMenu';

export const AdminHeader = ({ userEmail }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getPageTitle = () => pageTitles[location.pathname] || 'Dashboard';
  const [showSidebar, setShowSidebar] = useState(false);

  const onLogout = async () => {
    await dispatch(logoutThunk());
    navigate('/');
  };

  return (
    <header className={s.header}>
      <div className={s.burgerButton} onClick={() => setShowSidebar(true)}>
        <img src={burger} alt={'icon'}></img>
      </div>
      <div className={s.logo}>
        <img src={logo} alt={'logo'}></img>
      </div>
      <div className={s.title}>
        <h1>Medicine store</h1>
        <span>
          {getPageTitle()} | {userEmail?.userEmail || 'Guest'}
        </span>
      </div>
      <div onClick={onLogout} className={s.logout}>
        <img src={logout} alt={'logout'}></img>
      </div>
      {showSidebar && <SidebarMenu setShowSidebar={setShowSidebar} />}
    </header>
  );
};
