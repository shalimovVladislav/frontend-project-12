import React, { useContext, useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import userContext from '../elements/userContext.js';
import Navbar from '../elements/navbar';
import { selectors as channelsSelectors, addChannels, chooseChannel } from '../../slices/channelsReducer.js';
import { selectors as messagesSelectors, addMessages } from '../../slices/messagesReducer.js';

const Channel = (props) => {
  const {
    id,
    name,
    removable,
    currentChannelId,
  } = props;

  if (!removable) {
    return (
      <li className="nav-item w-100">
        <button type="button" className={`w-100 rounded-0 text-start btn ${id === currentChannelId ? 'btn-secondary' : ''}`} onClick={() => {}}>
          <span className="me-1">#</span>
          {name}
        </button>
      </li>
    );
  }

  return (
    <li className="nav-item w-100">
      <div role="group" className="d-flex dropdown btn-group">
        <button type="button" className={`w-100 rounded-0 text-start btn ${id === currentChannelId ? 'btn-secondary' : ''}`} onClick={() => {}}>
          <span className="me-1">#</span>
          {name}
        </button>
        <button type="button" id="react-aria6322154047-1" aria-expanded="false" className="flex-grow-0 dropdown-toggle dropdown-toggle-split btn" onClick={() => {}}>
          <span className="visually-hidden">Управление каналом</span>
        </button>
      </div>
    </li>
  );
};

const Channels = () => {
  const { t } = useTranslation();
  const channels = useSelector(channelsSelectors.selectAll);
  const { currentChannelId } = useSelector((state) => state.channels);
  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels')}</b>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => {}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {
          channels.map((channel) => {
            const params = { ...channel, currentChannelId };
            return (
              <Channel key={channel.id} {...params} />
            );
          })
        }
      </ul>
    </>
  );
};

const Message = (props) => {
  const {
    body,
    user,
  } = props;
  return (
    <div className="text-break mb-2">
      <b>{user}</b>
      {`: ${body}`}
    </div>
  );
};

const Chat = () => {
  const { currentChannelId } = useSelector((state) => state.channels);
  const channel = useSelector((state) => channelsSelectors.selectById(state, currentChannelId));
  const messages = useSelector(messagesSelectors.selectAll);
  const currentChannelMessages = messages.filter((message) => (
    message.channelId === currentChannelId
  ));
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: (data) => {
      console.log(data);
    },
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
          {`${currentChannelMessages.length} сообщений`}
        </span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5 ">
        {currentChannelMessages.map((message) => <Message key={message.id} />)}
      </div>
      <div className="mt-auto px-5 py-3">
        <form noValidate="" className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
          <div className="input-group has-validation">
            <input name="body" autoFocus aria-label="Новое сообщение" placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control" value={formik.values.messageText} onChange={formik.handleChange} />
            <button type="submit" disabled="" className="btn btn-group-vertical">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
              </svg>
              <span className="visually-hidden">Отправить</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Main = () => {
  const { user } = useContext(userContext);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (user === null) {
      navigate('/login', { replace: false });
    }
    const didMount = true;
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/data', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (didMount) {
          setFetching(false);
        }
        dispatch(addChannels(response.data.channels));
        dispatch(chooseChannel(response.data.currentChannelId));
        dispatch(addMessages(response.data.messages));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  });

  return (
    fetching
      ? (
        <div className="h-100 d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden" />
          </Spinner>
        </div>
      )
      : (
        <>
          <div className="d-flex flex-column h-100">
            <Navbar />
            <div className="container h-100 my-4 overflow-hidden rounded shadow">
              <div className="row h-100 bg-white flex-md-row">
                <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                  <Channels />
                </div>
                <div className="col p-0 h-100">
                  <Chat />
                </div>
              </div>
            </div>
          </div>
          <div className="Toastify" />
        </>
      )
  );
};

export default Main;
