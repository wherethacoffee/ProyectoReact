import React from 'react';
import { Route, Navigate } from 'react-router-dom'


const ProtectedRoute = ({ element, isLoggedIn, isAdmin }) => {
    if (isLoggedIn) {
        return element;
    } else {
        return <Navigate to="/iniciar-sesion" />;
    }
};

export default ProtectedRoute;