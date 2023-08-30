import React, { useState, useMemo } from 'react';
import UserContext from './userContext.js';

const UserProvider = ({ children }) => {
  const initialState = localStorage.getItem('user');
  const [user, setContextUser] = useState(initialState);

  const setUser = (u) => {
    setContextUser(u);
    localStorage.setItem('user', u);
  };

  const value = useMemo(() => ({ user, setUser }), [user]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
