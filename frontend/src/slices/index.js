import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsReducer.js';
import messagesReducer from './messagesReducer.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
  },
});
