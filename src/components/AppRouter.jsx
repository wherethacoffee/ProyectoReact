import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './Inicio';
import Login from './Login';
import RegistroTickets from './FormularioTickets';
import CrearUsuario from './CrearUsuario';

const AppRouter = () => {
  return (
    <Router>
        <Route path="/" element={<Inicio />} />
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/crear-ticket" element = {<RegistroTickets />}/>
        <Route path= "/crear-cuenta" element = {<CrearUsuario />}/>
        {/* Otras rutas */}
    </Router>
  );
};

export default AppRouter;
