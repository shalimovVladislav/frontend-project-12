import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import userContext from './userContext';

const Navbar = () => {
  const { isAuthorized, removeUser } = useContext(userContext);
  const { t } = useTranslation();
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link to="/" className="navbar-brand">{t('navbar.hexletChat')}</Link>
        {
          isAuthorized()
          && <button type="button" className="btn btn-primary" onClick={removeUser}>{t('navbar.logout')}</button>
        }
      </div>
    </nav>
  );
};

export default Navbar;
