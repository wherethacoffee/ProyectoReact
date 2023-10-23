import React from 'react';
import logo from '../images/logo.jpg'; // Importa tu logo
import '../styles/InicioStyle.css';

const Inicio = ({ isLoggedIn, isAdmin }) => {
  return (
    <div className="inicio-container">
      <header className="header">
        <img className="logo" src={logo} alt="Logo" />
        <h1 className="heading">Sistema de Tickets</h1>
        <div className="login-button">
          <a href="/iniciar-sesion">Iniciar Sesión</a>
        </div>
      </header>
      <div className="content">
        <div className="button-container">
          <button className="large-button">Crear Ticket</button>
          {isLoggedIn && isAdmin && (
            <button className="large-button">Modificar Tickets</button>
          )}
          {/* Otras opciones aquí */}
        </div>
      </div>
    </div>
  );
};

export default Inicio;
