import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './Inicio';
import Login from './Login';

const AppRouter = () => {
  return (
    <Router>
        <Route path="/" element={<Inicio />} />
        <Route path="/iniciar-sesion" element={<Login />} />
        {/* Otras rutas */}
    </Router>
  );
};

export default AppRouter;
