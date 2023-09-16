import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { io } from 'socket.io-client';

import { ApiContext } from './contexts/index.js';
import App from './components/App.jsx';
import reducer, { actions } from './slices/index.js';
import resources from './locales/index.js';

export default async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  const socket = io();

  socket.on('newMessage', (payload) => {
    console.log(payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
  });
  socket.on('newChannel', (payload) => {
    console.log(payload); // { id: 6, name: "new channel", removable: true }
  });
  socket.on('removeChannel', (payload) => {
    console.log(payload); // { id: 6 };
  });
  socket.on('renameChannel', (payload) => {
    console.log(payload); // { id: 7, name: "new name channel", removable: true }
  });

  const api = {
    
  };

  const store = configureStore({
    reducer,
  });

  const vdom = (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ApiContext.Provider value={api}>
          <App />
        </ApiContext.Provider>
      </I18nextProvider>
    </Provider>
  );

  return vdom;
};
