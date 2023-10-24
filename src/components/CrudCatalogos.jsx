import React, { useState, useEffect } from 'react';
import {
  registerAlumno,
  listAlumno,
  findAlumno,
  updateAlumno,
  deleteAlumno,
  // Importa los demás métodos para otras tablas
} from '../services/alumno.services';

const CrudComponent = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    // Define las propiedades según la tabla seleccionada
    curp: '',
    nombre: '',
    paterno: '',
    materno: '',
  });

  useEffect(() => {
    // Cargar los datos iniciales al montar el componente o cuando cambia la tabla seleccionada
    fetchData();
  }, [selectedTable]);

  const fetchData = async () => {
    // Selecciona la función correspondiente según la tabla seleccionada
    let fetchFunction;
    switch (selectedTable) {
      case 'alumno':
        fetchFunction = listAlumno;
        break;
      // Agrega los casos para las demás tablas
      default:
        // Establece una función por defecto o muestra un mensaje de error
        console.error('Tabla no válida');
        return;
    }

    try {
      const response = await fetchFunction();
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  const handleTableSelect = (tableName) => {
    setSelectedTable(tableName);
  };

  const handleRegister = async () => {
    // Selecciona la función correspondiente según la tabla seleccionada
    let registerFunction;
    switch (selectedTable) {
      case 'alumno':
        registerFunction = registerAlumno;
        break;
      // Agrega los casos para las demás tablas
      default:
        console.error('Tabla no válida');
        return;
    }

    try {
      const response = await registerFunction(formData);
      if (response.ok) {
        console.log('Registro exitoso');
        // Vuelve a cargar los datos después de agregar un nuevo registro
        fetchData();
      } else {
        console.error('Error al registrar:', response.statusText);
      }
    } catch (error) {
      console.error('Error al registrar:', error);
    }
  };

  // Añade funciones similares para manejar otras operaciones CRUD (actualizar, eliminar, etc.)

  return (
    <div>
      <div>
        <button onClick={() => handleTableSelect('alumno')}>Alumno</button>
        {/* Agrega botones para otras tablas */}
      </div>
      <div>
        {/* Formulario para ingresar datos según la tabla seleccionada */}
        {selectedTable && (
          <form>
            {/* Define los campos según la tabla seleccionada */}
            <label htmlFor="curp">CURP:</label>
            <input
              type="text"
              id="curp"
              name="curp"
              value={formData.curp}
              onChange={(e) => setFormData({ ...formData, curp: e.target.value })}
            />
            {/* Agrega otros campos del formulario según la tabla seleccionada */}
            <button type="button" onClick={handleRegister}>
              Registrar
            </button>
          </form>
        )}
      </div>
      <div>
        {/* Muestra los datos según la tabla seleccionada */}
        <ul>
          {data.map((item) => (
            <li key={item.id}>{/* Muestra los datos según la tabla seleccionada */}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CrudComponent;
