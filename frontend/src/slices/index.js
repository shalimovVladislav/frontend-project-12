import { combineReducers } from '@reduxjs/toolkit';

import channelsReducer, { actions as channelsActions, selectors as channelsSelectors } from './channelsReducer.js';
import messagesReducer, { actions as messagesActions, selectors as messagesSelectors } from './messagesReducer.js';

const getCurrentChannelId = (state) => state.channels.currentChannelId;
const getCurrentChannel = (state) => {
  const currentChannelId = getCurrentChannelId(state);
  const currentChannel = channelsSelectors.selectIds(state, currentChannelId);
  return currentChannel;
};
const getMessagesForCurrentChannel = (state) => {
  const currentChannelId = getCurrentChannelId(state);
  const messages = messagesSelectors.selectAll(state);
  const messagesForCurrentChannel = messages.filter((m) => m.channelId === currentChannelId);
  return messagesForCurrentChannel;
};

export const selectors = {
  channels: channelsSelectors,
  messages: messagesSelectors,
  getCurrentChannelId,
  getCurrentChannel,
  getMessagesForCurrentChannel,
};

export const actions = {
  ...channelsActions,
  ...messagesActions,
};

export default combineReducers({
  channelsReducer,
  messagesReducer,
});
