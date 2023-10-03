import { useContext } from 'react';

import { SoketContext } from '../contexts/SoketProvider.jsx';

const useApi = () => {
  const api = useContext(SoketContext);

  return api;
};

export default useApi;
