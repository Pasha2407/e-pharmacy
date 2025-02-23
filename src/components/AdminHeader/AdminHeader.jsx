import { useLocation } from 'react-router-dom';

import pageTitles from '../../shared/data/pageTitles.json';
import s from './AdminHeader.module.scss';

export const AdminHeader = ({ userEmail, onLogout }) => {
  const location = useLocation();
  const getPageTitle = () => pageTitles[location.pathname] || 'Dashboard';

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
