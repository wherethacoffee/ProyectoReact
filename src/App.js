import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './components/Inicio';  // Asegúrate de que la ruta sea correcta
import Login from './components/Login';    // Asegúrate de que la ruta sea correcta

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/iniciar-sesion" element={<Login />} />
        {/* Otras rutas */}
      </Routes>
    </Router>
  );
}

export default App;
