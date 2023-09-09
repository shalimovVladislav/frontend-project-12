import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import resources from './locales/index.js';
import UserProvider from './components/elements/userProvider.jsx';
import App from './components/App';
import store from './slices/index.js';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'ru',
      fallbackLng: 'ru',
    });

  return (
    <I18nextProvider i18n={i18n}>
      <UserProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </UserProvider>
    </I18nextProvider>
  );
};

export default init;
