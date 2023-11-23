import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/main';
import Login from '../modules/auth/login/login';

const RouteConfig = () => {
    return (
        <Routes>
            <Route path={'/login'} element={<Login />} />
            <Route path={'/*'} element={<MainLayout />} />
        </Routes>
    )
    
}

export default RouteConfig