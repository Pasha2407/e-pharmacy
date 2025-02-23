import { useState } from 'react';
import { Field, Formik, Form } from 'formik';

import { selectAuthError } from '../../redux/auth/authSelectors';
import { loginThunk, registerThunk } from '../../redux/auth/authServices';

import s from './LoginForm.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const LoginForm = ({ register }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectAuthError);
  const [buttonClick, setButtonClick] = useState(false);
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
    <div className={s.loginForm}>
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
    </div>
  );
};
