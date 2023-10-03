import React, { createContext, useMemo, useCallback } from 'react';

const SoketContext = createContext(null);

const SoketProvider = ({ children, socket }) => {
  const clarify = useCallback((...arg) => new Promise((resolve, reject) => {
    socket.timeout(3000).emit(...arg, (err, response) => (response?.status === 'ok' ? resolve(response?.data) : reject(err)));
  }), [socket]);

  const api = useMemo(() => ({
    sendMessage: (data) => clarify('newMessage', data),
    createChannel: (data) => clarify('newChannel', data),
    renameChannel: (data) => clarify('renameChannel', data),
    removeChannel: (data) => clarify('removeChannel', data),
  }), [clarify]);

  return (
    <SoketContext.Provider value={api}>
      {children}
    </SoketContext.Provider>
  );
};

export { SoketContext };

export default SoketProvider;
