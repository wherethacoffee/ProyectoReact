import React from 'react';
import '../styles/Listar.css'; // Asegúrate de tener un archivo CSS para los estilos

const Listar = () => {
  return (
    <div className="listar-container">
      <h1>Listado de Registros</h1>
      <div className="button-container">
        <button>Alumno</button>
        <button>Representante</button>
        <button>Asunto</button>
        <button>Nivel</button>
        <button>Estado</button>
        <button>Municipio</button>
        <button>Admin</button>
      </div>
      {/* Aquí puedes mostrar las tablas cuando el usuario seleccione una opción */}
    </div>
  );
};

export default Listar;
