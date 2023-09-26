import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { actions as channelsActions } from './channelsReducer.js';

const adapter = createEntityAdapter();

const initialState = adapter.getInitialState();

const selectors = adapter.getSelectors((state) => state.messages);

const slice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: adapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsActions.setInitialState, (state, { payload }) => {
        const { messages } = payload;
        adapter.addMany(state, messages);
      })
      .addCase(channelsActions.removeChannel, (state, { payload }) => {
        const { id } = payload;
        const removedMessagesIds = selectors
          .selectAll({ messages: state })
          .filter((m) => m.channelId === id)
          .map((m) => m.id);
        adapter.removeMany(state, removedMessagesIds);
      });
  },
});

export const { actions } = slice;

export { selectors };

export default slice.reducer;
