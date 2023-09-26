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

  const store = configureStore({
    reducer,
  });

  const socket = io();

  socket.on('newMessage', (payload) => {
    store.dispatch(actions.addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    store.dispatch(actions.addChannel(payload));
  });
  socket.on('removeChannel', (payload) => {
    store.dispatch(actions.removeChannel(payload));
  });
  socket.on('renameChannel', (payload) => {
    store.dispatch(actions.renameChannel(payload));
  });

  const api = {
    sendMessage: (data) => socket.timeout(3000).emit('newMessage', data),
    createChannel: (data) => socket.timeout(3000).emit('newChannel', data),
    renameChannel: (data) => socket.timeout(3000).emit('renameChannel', data),
    removeChannel: (data) => socket.timeout(3000).emit('removeChannel', data),
  };

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
