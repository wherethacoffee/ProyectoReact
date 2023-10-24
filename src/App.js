import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './components/Inicio';
import Login from './components/Login';
import { loginAdmin} from './services/admin.services';
import RegistroTickets from './components/FormularioTickets';
import CrearUsuario from './components/CrearUsuario';
import TurnoAdminComponent  from './components/TurnosAdmin'
import Dashboards from './components/Dashboard';
import Dashboard_total from './components/Dashboard_total';
import CrudComponent from './components/CrudCatalogos'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [admins, setAdmins] = useState([]);

  
  

  const handleLogin = (username, password) => {

    const response = loginAdmin({ username, password });

    // Lógica de autenticación aquí, actualiza isLoggedIn y isAdmin según la autenticación
    // Simulación: Si las credenciales son correctas y el usuario es administrador
    if (response.status = "200") {
      setIsLoggedIn(true);
      setIsAdmin(true);
      // Guarda el estado de administrador en localStorage
      localStorage.setItem('isAdmin', true);
    } else {
      // Lógica para manejar el acceso no autorizado o mostrar mensajes de error
      console.error("Verificaion fallida")
      console.log(admins)
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    // Elimina el estado de administrador de localStorage al cerrar sesión
    localStorage.removeItem('isAdmin');
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Inicio isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogout={handleLogout} />}
        />
        <Route
          path="/iniciar-sesion"
          element={<Login onLogin={handleLogin} />}
        />
        <Route
          path = "/crear-ticket"
          element ={<RegistroTickets isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogout={handleLogout} />}
        />
        <Route
          path = "/crear-cuenta"
          element ={<CrearUsuario isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogout={handleLogout} />}
        />
        <Route
          path = "/tickets-admin"
          element ={<TurnoAdminComponent isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogout={handleLogout} />}
        />
        <Route
          path = "/dashboard"
          element ={<Dashboards isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogout={handleLogout} />}
        />
        <Route
          path = "/dashboard-total"
          element ={<Dashboard_total isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogout={handleLogout} />}
        />
        <Route
          path = "/crud-catalogos"
          element ={<CrudComponent isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogout={handleLogout} />}
        />
        {/* Otras rutas */}
      </Routes>
    </Router>
  );
}

export default App;
