import React, { useState, useMemo, useCallback } from 'react';
import UserContext from './userContext.js';

const UserProvider = ({ children }) => {
  const storedUserData = localStorage.getItem('userData');
  const initialState = JSON.parse(storedUserData);
  const [user, setContextUser] = useState(initialState);

  const setUser = (u) => {
    setContextUser(u);
    localStorage.setItem('userData', JSON.stringify(u));
  };

  const removeUser = () => {
    setContextUser(null);
    localStorage.removeItem('userData');
  };

  const isAuthorized = () => (user !== null);

  const memoizedIsAuthorized = useCallback(isAuthorized, [user]);

  const value = useMemo(() => ({
    user,
    setUser,
    removeUser,
    isAuthorized: memoizedIsAuthorized,
  }), [user, memoizedIsAuthorized]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
