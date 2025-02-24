import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { Field, Formik, Form } from 'formik';

import { selectAuthError } from '../../redux/auth/authSelectors';
import { loginThunk, registerThunk } from '../../redux/auth/authServices';

import s from './AuthForm.module.scss';

export const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectAuthError);
  const [buttonClick, setButtonClick] = useState(false);
  const [register, setRegister] = useState(false);
  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = (values, { setSubmitting }) => {
    if (register) {
      dispatch(registerThunk(values))
        .unwrap()
        .then(() => {
          navigate('/admin/dashboard');
        })
        .catch(error => {
          console.error('Login failed:', error);
        })
        .finally(() => {
          setSubmitting(false);
        });
    } else {
      dispatch(loginThunk(values))
        .unwrap()
        .then(() => {
          navigate('/admin/dashboard');
        })
        .catch(error => {
          console.error('Login failed:', error);
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  };

  return (
    <div className={s.authForm}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
            <span onClick={() => setRegister(false)}> Log in now</span>
          </p>
        ) : (
          <p>
            Don`t have an account yet?
            <span onClick={() => setRegister(true)}> Register now</span>
          </p>
        )}
        <p>or</p>
        <button className={s.google}>Log in with Google</button>
        <button>
          <NavLink to="/admin/dashboard">Log in as a guest</NavLink>
        </button>
      </div>
    </div>
  );
};
