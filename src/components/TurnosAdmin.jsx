import React, { useState, useEffect } from 'react';
import {
  listTurno,
  findTurno,
  registerTurno,
  updateTurno,
  deleteTurno
} from '../services/turno.services'; // Ajusta la ruta según sea necesario

const TurnoAdminComponent = () => {
  const [turnos, setTurnos] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedTurno, setSelectedTurno] = useState(null);

  useEffect(() => {
    // Cargar la lista de turnos al montar el componente
    loadTurnos();
  }, []);

  const loadTurnos = async () => {
    try {
      const response = await listTurno();
      const data = await response.json();
      setTurnos(data);
    } catch (error) {
      console.error('Error al cargar la lista de turnos:', error);
    }
  };

  const handleSearch = async () => {
    if (searchValue.trim() === '') {
      // Si el campo de búsqueda está vacío, cargar todos los turnos
      loadTurnos();
    } else {
      // Buscar por CURP o nombre
      try {
        const response = await findTurno(searchValue);
        const data = await response.json();
        setTurnos([data]); // Poner el resultado en un array para mantener la consistencia
      } catch (error) {
        console.error('Error al buscar el turno:', error);
        setTurnos([]); // Limpiar la lista en caso de error
      }
    }
  };

  const handleRegister = async () => {
    // Implementar la lógica para registrar un nuevo turno
    // Puedes usar el formulario o un modal para recopilar la información
    // y luego llamar a la función de registro (registerRequest)
  };

  const handleUpdate = async () => {
    // Implementar la lógica para actualizar el turno seleccionado
    if (selectedTurno) {
      try {
        await updateTurno(selectedTurno.idTurno, selectedTurno);
        loadTurnos(); // Recargar la lista después de la actualización
        setSelectedTurno(null); // Limpiar el turno seleccionado
      } catch (error) {
        console.error('Error al actualizar el turno:', error);
      }
    }
  };

  const handleDelete = async () => {
    // Implementar la lógica para eliminar el turno seleccionado
    if (selectedTurno) {
      try {
        await deleteTurno(selectedTurno.idTurno);
        loadTurnos(); // Recargar la lista después de la eliminación
        setSelectedTurno(null); // Limpiar el turno seleccionado
      } catch (error) {
        console.error('Error al eliminar el turno:', error);
      }
    }
  };

  const handleStatusChange = async (newStatus) => {
    // Implementar la lógica para cambiar el estado del turno seleccionado
    if (selectedTurno) {
      try {
        // Actualizar el campo "Status" del turno
        await updateTurno(selectedTurno.idTurno, { ...selectedTurno, Status: { descripcion: newStatus } });
        loadTurnos(); // Recargar la lista después del cambio de estado
      } catch (error) {
        console.error('Error al cambiar el estado del turno:', error);
      }
    }
  };

  return (
    <div>
      {/* Componente para la búsqueda por CURP o nombre */}
      <div>
        <input
          type="text"
          placeholder="Buscar por CURP o nombre"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {/* Lista de turnos */}
      <ul>
        {turnos.map((turno) => (
          <li key={turno.idTurno} onClick={() => setSelectedTurno(turno)}>
            {turno.idTurno} - {turno.Alumno.curp} - {turno.Representante.nombre} - {turno.Status.descripcion}
          </li>
        ))}
      </ul>

      {/* Detalles y acciones para el turno seleccionado */}
      {selectedTurno && (
        <div>
          <h2>Detalles del Turno</h2>
          <p>ID: {selectedTurno.idTurno}</p>
          <p>Nombre del Representante: {selectedTurno.Representante.nombre}</p>
          <p>CURP del Alumno: {selectedTurno.Alumno.curp}</p>
          <p>Municipio: {selectedTurno.Municipio.nombre}</p>
          <p>Asunto: {selectedTurno.Asunto.descripcion}</p>
          <p>Nivel: {selectedTurno.Nivel.descripcion}</p>
          <p>Status: {selectedTurno.Status.descripcion}</p>

          {/* Acciones */}
          <button onClick={handleUpdate}>Actualizar</button>
          <button onClick={handleDelete}>Eliminar</button>

          {/* Cambiar el estado del turno */}
          <div>
            <button onClick={() => handleStatusChange('Resuelto')}>Marcar como Resuelto</button>
            <button onClick={() => handleStatusChange('Pendiente')}>Marcar como Pendiente</button>
          </div>
        </div>
      )}

      {/* Formulario para registrar un nuevo turno */}
      <div>
        <h2>Registrar Nuevo Turno</h2>
        {/* Implementa el formulario para recopilar la información del nuevo turno */}
        {/* y llama a la función handleRegister al hacer clic en un botón */}
        <button onClick={handleRegister}>Registrar</button>
      </div>
    </div>
  );
};

export default TurnoAdminComponent;
