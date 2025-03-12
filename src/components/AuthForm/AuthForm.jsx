import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { selectAuthError } from '../../redux/auth/authSelectors';
import { loginThunk, registerThunk } from '../../redux/auth/authServices';
import { GoogleButton } from 'components/GoogleButton/GoogleButton';
import s from './AuthForm.module.scss';

const validationSchema = Yup.object({
  password: Yup.string()
    .min(4, 'Password must contain at least 4 characters')
    .required('Password required'),
});

export const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectAuthError);
  const [buttonClick, setButtonClick] = useState(false);
  const [register, setRegister] = useState(() => {
    return localStorage.getItem('register') === 'true';
  });

  const clickRegister = () => {
    localStorage.setItem('register', 'true');
    window.location.reload();
  };

  const clickLogin = () => {
    setRegister(false);
    localStorage.removeItem('register');
    window.location.reload();
  };

  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = (values, { setSubmitting }) => {
    const thunk = register ? registerThunk : loginThunk;
    dispatch(thunk(values))
      .unwrap()
      .then(() => navigate('/admin/dashboard'))
      .catch(error => console.error('Login failed:', error))
      .finally(() => setSubmitting(false));
  };

  return (
    <div className={s.authForm}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form className={s.form}>
            <Field
              className={s.formLabel}
              name="email"
              type="email"
              placeholder="Email address"
            />
            <Field
              className={s.formLabel}
              name="password"
              type="password"
              placeholder="Password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className={s.passwordError}
            />
            <button
              onClick={() => setButtonClick(true)}
              type="submit"
              disabled={isSubmitting}
            >
              {register ? 'Registration' : 'Log in'}
            </button>
            {buttonClick && error && (
              <div className={s.error}>
                {register ? <p>Error Registration!</p> : <p>Error Log in!</p>}
                <small>Maybe wrong password or email</small>
              </div>
            )}
          </Form>
        )}
      </Formik>
      <div className={s.alternative}>
        {register ? (
          <p>
            Do you have an account?
            <span onClick={clickLogin}> Log in now</span>
          </p>
        ) : (
          <p>
            Don`t have an account yet?
            <span onClick={clickRegister}> Register now</span>
          </p>
        )}
        <p>or</p>
        <GoogleButton />
        <button className={s.guestButton}>
          <NavLink to="/admin/dashboard">Log in as a guest</NavLink>
        </button>
      </div>
    </div>
  );
};
