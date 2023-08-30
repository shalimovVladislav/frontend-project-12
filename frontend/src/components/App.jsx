import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './pages/unknownRoutePage.jsx';
import Main from './pages/mainPage.jsx';
import Signup from './pages/signupPage.jsx';
import Login from './pages/loginPage.jsx';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Main />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default App;
