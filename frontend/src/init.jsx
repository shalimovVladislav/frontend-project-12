import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { io } from 'socket.io-client';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import leoProfanity from 'leo-profanity';

import { ApiContext } from './contexts/index.js';
import App from './components/App.jsx';
import reducer, { actions } from './slices/index.js';
import resources from './locales/index.js';
import badWords from './locales/badWords.js';

export default async () => {
  const isProduction = process.env.NODE_ENV === 'production';

  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  const ruDict = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruDict);
  leoProfanity.add(badWords);

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

  const rollbarConfig = {
    enabled: isProduction,
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
  };

  const vdom = (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <ApiContext.Provider value={api}>
              <App />
            </ApiContext.Provider>
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );

  return vdom;
};
