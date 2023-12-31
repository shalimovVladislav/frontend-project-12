/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const adapter = createEntityAdapter();

const initialState = adapter.getInitialState({
  currentChannelId: null,
});

const selectors = adapter.getSelectors((state) => state.channels);

const slice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setInitialState(state, { payload }) {
      const { channels, currentChannelId } = payload;
      adapter.addMany(state, channels);
      state.currentChannelId = currentChannelId;
    },
    setCurrentChannel(state, { payload }) {
      const { channelId } = payload;
      state.currentChannelId = channelId;
    },
    addChannel: adapter.addOne,
    removeChannel(state, { payload }) {
      const { id } = payload;
      if (state.currentChannelId === id) {
        const generalChannel = selectors
          .selectAll({ channels: state })
          .find((c) => c.name === 'general');
        state.currentChannelId = generalChannel.id;
      }
      adapter.removeOne(state, id);
    },
    renameChannel(state, { payload }) {
      adapter.updateOne(state, { id: payload.id, changes: payload });
    },
  },
});

export const { actions } = slice;

export { selectors };

export default slice.reducer;
