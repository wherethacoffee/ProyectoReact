import React from 'react';
import logo from '../images/logo.jpg';
import '../styles/InicioStyle.css';
import { Link } from 'react-router-dom';

const Inicio = ({ isLoggedIn, isAdmin, onLogout }) => {
  return (
    <div className="inicio-container">
      <header className="header">
        <img className="logo" src={logo} alt="Logo" />
        <h1 className="heading">Sistema de Tickets</h1>
        {isLoggedIn && isAdmin ? (
          // Si está logueado como administrador, muestra el botón "Cerrar Sesión"
          <button className="small-button" onClick={onLogout}>
            Cerrar Sesión
          </button>
        ) : (
          // Si no está logueado o no es administrador, muestra el botón "Iniciar Sesión"
          <Link to="/iniciar-sesion" className="small-button">
            Iniciar Sesión
          </Link>
        )}
      </header>
      <div className="content">
        <div className="button-container">
          <Link to="/crear-ticket" className="large-button">
            Crear Ticket
          </Link>
          {isLoggedIn && isAdmin && (
            <button className="large-button">Modificar Tickets</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inicio;
