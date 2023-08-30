import React from 'react';
import { Link } from 'react-router-dom';
import image from '../../assets/notFound.png';

const NotFound = () => (
  <>
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/">
            Hexlet Chat
          </a>
        </div>
      </nav>
      <div className="text-center">
        <img alt="Страница не найдена" className="img-fluid h-25" src={image} />
        <h1 className="h4 text-muted">Страница не найдена</h1>
        <p className="text-muted">
          {'Но вы можете перейти '}
          <Link to="/">на главную страницу</Link>
        </p>
      </div>
    </div>
    <div className="Toastify" />
  </>
);

export default NotFound;
