import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { io } from 'socket.io-client';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import leoProfanity from 'leo-profanity';

import AuthProvider from './contexts/AuthProvider.jsx';
import SoketProvider from './contexts/SoketProvider.jsx';
import App from './components/App.jsx';
import store, { actions } from './slices/index.js';
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
            <AuthProvider>
              <SoketProvider socket={socket}>
                <App />
              </SoketProvider>
            </AuthProvider>
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );

  return vdom;
};
