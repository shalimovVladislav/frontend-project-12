import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { ToastContainer as Toaster } from 'react-toastify';

import Login from '../pages/Login.jsx';
import Registration from '../pages/Registration.jsx';
import ChatPage from '../pages/ChatPage.jsx';
import Navbar from './Navbar.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';

import useAuth from '../hooks/useAuth.js';
import routes from '../routes.js';

const PrivateOutlet = () => {
  const auth = useAuth();
  return auth.user ? <Outlet /> : <Navigate to={routes.loginPagePath()} />;
};

const App = () => (
  <Router>
    <div className="d-flex flex-column h-100">
      <Navbar />
      <Routes>
        <Route path={routes.loginPagePath()} element={<Login />} />
        <Route path={routes.signupPagePath()} element={<Registration />} />
        <Route path={routes.chatPagePath()} element={<PrivateOutlet />}>
          <Route path="" element={<ChatPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
    <Toaster />
  </Router>
);

export default App;
