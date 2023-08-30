import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import userContext from '../elements/userContext';
import image from '../../assets/singup.jpg';

const SignupForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(userContext);
  const SignupSchema = yup.object().shape({
    username: yup.string()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов'),
    password: yup.string()
      .required('Обязательное поле')
      .min(6, 'Не менее 6 символов'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
  });
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (data) => {
      const response = await axios.post('/api/v1/signup', { username: data.username, password: data.password });
      setUser(response.data);
      navigate('/', { replace: false });
    },
  });
  return (
    <form className="w-50" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">
        Регистрация
      </h1>
      <div className="form-floating mb-3">
        <input
          placeholder="От 3 до 20 символов"
          type="text"
          name="username"
          autoComplete="username"
          required
          autoFocus
          id="username"
          className={`form-control ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <label className="form-label" htmlFor="username">Имя пользователя</label>
        {
          formik.touched.username
          && formik.errors.username
          && <div className="invalid-tooltip opacity-75">{formik.errors.username}</div>
        }
      </div>
      <div className="form-floating mb-3">
        <input
          placeholder="Не менее 6 символов"
          name="password"
          aria-describedby="passwordHelpBlock"
          required=""
          autoComplete="new-password"
          type="password"
          id="password"
          className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
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
      </div>
      <div className="form-floating mb-4">
        <input
          placeholder="Пароли должны совпадать"
          name="confirmPassword"
          required
          autoComplete="new-password"
          type="password"
          id="confirmPassword"
          className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
        />
        <label className="form-label" htmlFor="confirmPassword">Подтвердите пароль</label>
        {
          formik.touched.confirmPassword
          && formik.errors.confirmPassword
          && <div className="invalid-tooltip opacity-75">{formik.errors.confirmPassword}</div>
        }
      </div>
      <button type="submit" className="w-100 btn btn-outline-primary">
        Зарегистрироваться
      </button>
    </form>
  );
};

const Signup = () => (
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
              <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <img src={image} className="rounded-circle mx-auto d-block" alt="Регистрация" />
                <SignupForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="Toastify" />
  </>
);

export default Signup;
