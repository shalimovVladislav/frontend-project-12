import { combineReducers, createSelector } from '@reduxjs/toolkit';

import channelsReducer, { actions as channelsActions, selectors as channelsSelectors } from './channelsReducer.js';
import messagesReducer, { actions as messagesActions, selectors as messagesSelectors } from './messagesReducer.js';
import modalReducer, { actions as modalActions } from './modalReducer.js';

const getCurrentChannelId = (state) => state.channels.currentChannelId;

const getCurrentChannel = (state) => {
  const currentChannelId = getCurrentChannelId(state);
  const currentChannel = channelsSelectors.selectById(state, currentChannelId);
  return currentChannel;
};

const getChannelsNames = createSelector([
  channelsSelectors.selectAll,
], (channels) => channels.map((c) => c.name));

const getMessagesForCurrentChannel = createSelector([
  getCurrentChannelId,
  messagesSelectors.selectAll,
], (currentChannelId, messages) => {
  const messagesForCurrentChannel = messages.filter((m) => m.channelId === currentChannelId);
  return messagesForCurrentChannel;
});

export const selectors = {
  channels: channelsSelectors,
  messages: messagesSelectors,
  getCurrentChannelId,
  getCurrentChannel,
  getChannelsNames,
  getMessagesForCurrentChannel,
};

export const actions = {
  ...channelsActions,
  ...messagesActions,
  ...modalActions,
};

export default combineReducers({
  channels: channelsReducer,
  messages: messagesReducer,
  modal: modalReducer,
});
