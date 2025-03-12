import welcomeTablet from 'shared/images/welcome-tablet.png';
import logo from 'shared/images/logo.png';
import { AuthForm } from 'components/AuthForm/AuthForm';
import s from './Welcome.module.scss';

export const Welcome = () => {
  return (
    <div className={s.container}>
      <header>
        <div className={s.logo}>
          <img src={logo} alt={'logo'}></img>
        </div>
        <h1 className={s.title}>E-Pharmacy</h1>
      </header>
      <main>
        <div className={s.welcomeTitle}>
          <div className={s.image}>
            <img src={welcomeTablet} alt={'tablet'}></img>
          </div>
          <p>
            Your medication, delivered Say goodbye to all
            <span> your healthcare </span>
            worries with us
          </p>
        </div>
        <AuthForm />
      </main>
    </div>
  );
};
