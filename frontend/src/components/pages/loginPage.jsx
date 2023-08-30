import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import userContext from '../elements/userContext';
import image from '../../assets/login.jpg';

const LoginForm = () => {
  const [isAuthFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(userContext);
  const LoginSchema = yup.object().shape({
    username: yup.string()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов'),
    password: yup.string()
      .required('Обязательное поле'),
  });
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (data) => {
      try {
        const response = await axios.post('/api/v1/login', data);
        setUser(response.data);
        navigate('/', { replace: false });
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          return;
        }
        throw err;
      }
    },
  });
  return (
    <form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Войти</h1>
      <div className="form-floating mb-3">
        <input
          name="username"
          autoComplete="username"
          required
          autoFocus
          placeholder="Ваш ник"
          id="username"
          className={`form-control ${(formik.touched.username && formik.errors.username) || isAuthFailed ? 'is-invalid' : ''}`}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <label htmlFor="username">Ваш ник</label>
        {
          formik.touched.username
          && formik.errors.username
          && <div className="invalid-tooltip opacity-75">{formik.errors.username}</div>
        }
      </div>
      <div className="form-floating mb-4">
        <input
          name="password"
          autoComplete="current-password"
          required
          placeholder="Пароль"
          type="password"
          id="password"
          className={`form-control ${(formik.touched.password && formik.errors.password) || isAuthFailed ? 'is-invalid' : ''}`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <label className="form-label" htmlFor="password">Пароль</label>
        {
          formik.touched.password
          && formik.errors.password
          && <div className="invalid-tooltip opacity-75">{formik.errors.password}</div>
        }
        {
          isAuthFailed
          && <div className="invalid-tooltip opacity-75">Неверные имя пользователя или пароль</div>
        }
      </div>
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
    </form>
  );
};
const Login = () => (
  <>
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link to="/" className="navbar-brand">Hexlet Chat</Link>
        </div>
      </nav>
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img src={image} className="rounded-circle" alt="Войти" />
                </div>
                <LoginForm />
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>Нет аккаунта? </span>
                  <a href="/signup">
                    Регистрация
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="Toastify" />
  </>
);

export default Login;
