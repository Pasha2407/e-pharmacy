import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setGoogleUser } from '../../redux/auth/authSlice';
import s from './GoogleButton.module.scss';

export const GoogleButton = () => {
  const dispatch = useDispatch();

  const googleAuth = () => {
    const width = 500;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    const authWindow = window.open(
      'http://localhost:4000/auth/google',
      'GoogleAuth',
      `width=${width},height=${height},top=${top},left=${left},resizable=no,scrollbars=yes,status=no`
    );
    if (authWindow) authWindow.focus();
  };

  useEffect(() => {
    const handleMessage = event => {
      if (event.origin !== 'http://localhost:4000') return;
      const { user } = event.data;
      if (user) {
        dispatch(setGoogleUser({ user }));
      }
    };
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [dispatch]);

  return (
    <button className={s.button} onClick={googleAuth}>
      Log in with Google
    </button>
  );
};
