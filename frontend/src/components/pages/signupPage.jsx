import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import userContext from '../elements/userContext';
import Navbar from '../elements/navbar';
import image from '../../assets/singup.jpg';

const SignupForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(userContext);
  const { t } = useTranslation();
  const SignupSchema = yup.object().shape({
    username: yup.string()
      .required(t('forms.invalidTooltips.requiredField'))
      .min(3, t('forms.invalidTooltips.requiredCharactersNumber'))
      .max(20, t('forms.invalidTooltips.requiredCharactersNumber')),
    password: yup.string()
      .required(t('forms.invalidTooltips.requiredField'))
      .min(6, t('signupForm.minSixСharacters')),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], t('signupForm.passwordsMustMatch')),
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
        {t('forms.registration')}
      </h1>
      <div className="form-floating mb-3">
        <input
          placeholder={t('forms.invalidTooltips.requiredCharactersNumber')}
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
        <label className="form-label" htmlFor="username">{t('signupForm.username')}</label>
        {
          formik.touched.username
          && formik.errors.username
          && <div className="invalid-tooltip opacity-75">{formik.errors.username}</div>
        }
      </div>
      <div className="form-floating mb-3">
        <input
          placeholder={t('signupForm.minSixСharacters')}
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
        <label className="form-label" htmlFor="password">{t('forms.password')}</label>
        {
          formik.touched.password
          && formik.errors.password
          && <div className="invalid-tooltip opacity-75">{formik.errors.password}</div>
        }
      </div>
      <div className="form-floating mb-4">
        <input
          placeholder={t('signupForm.passwordsMustMatch')}
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
        <label className="form-label" htmlFor="confirmPassword">{t('signupForm.confirmPassword')}</label>
        {
          formik.touched.confirmPassword
          && formik.errors.confirmPassword
          && <div className="invalid-tooltip opacity-75">{formik.errors.confirmPassword}</div>
        }
      </div>
      <button type="submit" className="w-100 btn btn-outline-primary">
        {t('signupForm.signup')}
      </button>
    </form>
  );
};

const Signup = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="d-flex flex-column h-100">
        <Navbar />
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <div className="card shadow-sm">
                <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                  <img src={image} className="rounded-circle mx-auto d-block" alt={t('forms.registration')} />
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
};

export default Signup;
