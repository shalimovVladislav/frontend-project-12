import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import image from '../assets/notFoundPage.png';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img alt={t('notFound.header')} className="img-fluid h-25" src={image} />
      <h1 className="h4 text-muted">
        {t('notFound.header')}
      </h1>
      <p className="text-muted">
        {t('notFound.message')}
        <Link href="/">{t('notFound.linkText')}</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
