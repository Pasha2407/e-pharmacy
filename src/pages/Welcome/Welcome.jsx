import { NavLink } from 'react-router-dom';

import { LoginForm } from 'components/LoginForm/LoginForm';
import s from './Welcome.module.scss';
import { useState } from 'react';

export const Welcome = () => {
  const [register, setRegister] = useState(false);

  return (
    <div className={s.container}>
      <header>
        <div className={s.logo}></div>
        <h1 className={s.title}>E-Pharmacy</h1>
      </header>
      <main>
        <div className={s.welcomeTitle}>
          <div className={s.image}></div>
          <p>
            Your medication, delivered Say goodbye to all
            <span> your healthcare </span>
            worries with us
          </p>
        </div>
        <LoginForm register={register} />
        <NavLink to="/admin/dashboard">Log in as a guest</NavLink>
        <p>
          Don`t have an account yet?
          <span onClick={() => setRegister(true)}>Register now</span>
        </p>
      </main>
    </div>
  );
};
