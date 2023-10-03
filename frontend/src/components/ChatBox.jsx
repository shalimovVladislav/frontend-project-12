import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { selectors } from '../slices/index.js';
import NewMessageForm from './NewMessageForm.jsx';

const Message = ({ username, body }) => (
  <div className="text-break mb-2">
    <b>{username}</b>
    {': '}
    {body}
  </div>
);

const ChatBox = () => {
  const channel = useSelector(selectors.getCurrentChannel);
  const messages = useSelector(selectors.getMessagesForCurrentChannel);
  const { t } = useTranslation();
  const ref = useRef(null);

  useEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight;
  });

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            {`# ${channel?.name}`}
          </b>
        </p>
        <span className="text-muted">
          {`${messages.length} ${t('chat.messageCount', { count: messages.length })}`}
        </span>
      </div>
      <div id="messages-box" ref={ref} className="chat-messages overflow-auto px-5 ">
        {messages.map(({ id, username, body }) => (
          <Message
            key={id}
            username={username}
            body={body}
          />
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <NewMessageForm channel={channel} />
      </div>
    </div>
  );
};

export default ChatBox;
