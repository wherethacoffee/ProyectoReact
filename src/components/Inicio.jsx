import React from 'react';
import logo from '../images/logo.jpg';
import '../styles/InicioStyle.css';
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom
import Login from '../components/Login';

const Inicio = ({ isLoggedIn, isAdmin }) => {
  return (
    <div className="inicio-container">
      <header className="header">
        <img className="logo" src={logo} alt="Logo" />
        <h1 className="heading">Sistema de Tickets</h1>
        <div className="login-button">
          <Link to="/iniciar-sesion">Iniciar Sesión</Link>
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
