import React, { useMemo } from 'react';

import { ApiContext } from '../contexts/index.js';

const AuthProvider = ({ children, socket }) => {
  const api = useMemo(() => ({
    sendMessage: (data) => socket.timeout(3000).emit('newMessage', data),
    createChannel: (data) => socket.timeout(3000).emit('newChannel', data),
    renameChannel: (data) => socket.timeout(3000).emit('renameChannel', data),
    removeChannel: (data) => socket.timeout(3000).emit('removeChannel', data),
  }), [socket]);

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
};

export default AuthProvider;
