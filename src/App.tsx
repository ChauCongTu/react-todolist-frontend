import React, { useState } from 'react';
import './App.css';
import Login from './modules/auth/login/login';
import MainLayout from './layouts/main';
import { AuthProvider, useAuth } from './providers/AuthProvider';
import Logout from './modules/auth/logout/logout';

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
      {isLoggedIn ? <><MainLayout /> <Logout /></> : <Login />}
    </div>
  );
};

export default App;
