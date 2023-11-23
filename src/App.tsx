import React, { useState } from 'react';
import './App.css';
import Login from './modules/auth/login/login';
import MainLayout from './layouts/main';
import { AuthProvider, useAuth } from './providers/AuthProvider';
import Logout from './modules/auth/logout/logout';
import Auth from './layouts/auth';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

const AppContent: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div>
      {isLoggedIn ? <><MainLayout /> <Logout /></> : <Auth />}
    </div>
  );
};

export default App;
