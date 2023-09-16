import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ChannelsBox from './ChannelsBox.jsx';
import ChatBox from './ChatBox.jsx';
import { actions } from '../slices/index.js';
import routes from '../routes.js';
import { useAuth } from '../hooks/index.js';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();
  const auth = useAuth();

  
  useEffect(() => {
    let didMount = true;

    const fetchData = async () => {
      try {
        const res = await axios.get(routes.dataPath(), { headers: auth.getAuthHeader() });
        if (didMount) setFetching(false);
        dispatch(actions.setInitialState(res.data));
      } catch (err) {
        if (!err.isAxiosError) {
          throw(err);
        }

        if (err.response?.status === 401) {
          navigate(routes.loginPagePath());
        } else {
          throw(err);
        }
      }
    };

    fetchData();

    return () => { didMount = false; };
  }, [dispatch, auth, t, navigate]);

  return fetching
    ? (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">{t('loading')}</span>
        </Spinner>
      </div>
    )
    : (
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <ChannelsBox />
          </div>
          <div className="col p-0 h-100">
            <ChatBox />
          </div>
        </div>
      </div>
    );
};

export default ChatPage;
