import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Outlet } from 'react-router-dom';
import image from '../../assets/Login.jpg';

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (values) => {
      const userSchema = yup.object({
        username: yup.string().required().min(3).max(20),
        password: yup.string().required().min(6),
        confirmPassword: yup.string().oneOf([values.password]),
      });
      try {
        const user = await userSchema.validate(values);
      } catch (e) {
        console.log(e);
      }
    },
    onChange: (values) => {
      console.log(values);
    },
  });
  return (
    <form className="w-50" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">
        Регистрация
      </h1>
      <div className="form-floating mb-3">
        <label className="form-label" htmlFor="username">Имя пользователя</label>
        <input placeholder="От 3 до 20 символов" name="username" autoComplete="username" required="" id="username" className="form-control" value={formik.values.username} onChange={formik.handleChange} />
      </div>
      <div className="form-floating mb-3">
        <label className="form-label" htmlFor="password">Пароль</label>
        <input placeholder="Не менее 6 символов" name="password" aria-describedby="passwordHelpBlock" required="" autoComplete="new-password" type="password" id="password" className="form-control" value={formik.values.password} onChange={formik.handleChange} />
        <div className="invalid-tooltip">
          Обязательное поле
        </div>
      </div>
      <div className="form-floating mb-4">
        <label className="form-label" htmlFor="confirmPassword">Подтвердите пароль</label>
        <input placeholder="Пароли должны совпадать" name="confirmPassword" required="" autoComplete="new-password" type="password" id="confirmPassword" className="form-control" value={formik.values.confirmPassword} onChange={formik.handleChange} />
        <div className="invalid-tooltip" />
      </div>
      <button type="submit" className="w-100 btn btn-outline-primary">
        Зарегистрироваться
      </button>
    </form>
  );
};

const Login = () => (
  <div className="h-100">
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <a className="navbar-brand" href="/">
              Hexlet Chat
            </a>
          </div>
        </nav>
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <div className="card shadow-sm">
                <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                  <div>
                    <img src={image} className="rounded-circle" alt="Регистрация" />
                    <SignupForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Toastify" />
    </div>
    <Outlet />
  </div>
);

export default Login;
