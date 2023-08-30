import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import userContext from '../elements/userContext.js';

const Main = () => {
  const { user } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate('/login', { replace: false });
      return;
    }
    const requestData = async () => {
      const response = await axios.get('/api/v1/data', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(response.data);
    };
    requestData();
  });

  return (
    <h1>
      Main
    </h1>
  );
};

export default Main;
