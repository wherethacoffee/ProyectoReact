import React, { useState, useEffect } from 'react';
import {registerAlumno} from '../services/alumno.services'; 
import {registerRepresentante} from '../services/representante.services'  
import { registerAsunto} from '../services/asunto.services'
import {registerNivel} from '../services/nivel.services'
import {registerEstado}from '../services/estado.services'
import {registerMunicipio} from '../services/municipio.services'
import {registerAdmin} from '../services/admin.services'
// Ajusta las importaciones según tus necesidades

import '../styles/CrudComponent.css'; // Asegúrate de tener un archivo CSS para los estilos

const CrudComponent = () => {
  const [selectedForm, setSelectedForm] = useState(null);
  const [formData, setFormData] = useState({});

  const handleButtonClick = (formType) => {
    setSelectedForm(formType);
    setFormData({}); // Reinicia el formulario al cambiar de tipo
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Lógica para enviar los datos del formulario a la API según el tipo de formulario seleccionado
    // Utiliza la función adecuada según el tipo de formulario seleccionado
    try {
      switch (selectedForm) {
        case 'alumno':
          await registerAlumno(formData);
          break;
        case 'representante':
          await registerRepresentante(formData);
          break;
        case 'asunto':
          await registerAsunto(formData);
          break;
        case 'nivel':
          await registerNivel(formData);
          break;
        case 'estado':
          await registerEstado(formData);
          break;
        case 'municipio':
          await registerMunicipio(formData);
          break;
        case 'admin':
          await registerAdmin(formData);
          break;
        default:
          console.error('Tipo de formulario no válido');
      }
      // Después de enviar los datos, puedes hacer alguna acción, como recargar los datos.
    } catch (error) {
      console.error('Error al registrar:', error);
    }
  };

  return (
    <div className="crud-container">
      <h1>Editor para Administradores</h1>
      <div className="button-container">
        <button onClick={() => handleButtonClick('alumno')}>Alumno</button>
        <button onClick={() => handleButtonClick('representante')}>Representante</button>
        <button onClick={() => handleButtonClick('asunto')}>Asunto</button>
        <button onClick={() => handleButtonClick('nivel')}>Nivel</button>
        <button onClick={() => handleButtonClick('estado')}>Estado</button>
        <button onClick={() => handleButtonClick('municipio')}>Municipio</button>
        <button onClick={() => handleButtonClick('admin')}>Admin</button>
      </div>
      {selectedForm && (
        <form className="form-container-crud" onSubmit={handleFormSubmit}>
          {selectedForm === 'alumno' && (
            <>
              <label htmlFor="curp">CURP:</label>
              <input
                type="text"
                id="curp"
                name="curp"
                value={formData.curp || ''}
                onChange={(e) => setFormData({ ...formData, curp: e.target.value })}
              />
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre || ''}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              />
              <label htmlFor="paterno">Apellido Paterno:</label>
              <input
                type="text"
                id="paterno"
                name="paterno"
                value={formData.paterno || ''}
                onChange={(e) => setFormData({ ...formData, paterno: e.target.value })}
              />
              <label htmlFor="materno">Apellido Materno:</label>
              <input
                type="text"
                id="materno"
                name="materno"
                value={formData.materno || ''}
                onChange={(e) => setFormData({ ...formData, materno: e.target.value })}
              />

          <div className="button-group">
            <button>Agregar</button>
            <button>Editar</button>
            <button>Borrar</button>
          </div>
            </>
          )}
        {selectedForm === 'representante' && (
        <div className="form-container-crud">
          <label htmlFor="id">ID:</label>
          <input type="text" id="id" name="id" />

          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" />

          <label htmlFor="celular">Celular:</label>
          <input type="text" id="celular" name="celular" />

          <label htmlFor="telefono">Teléfono:</label>
          <input type="text" id="telefono" name="telefono" />

          <label htmlFor="correo">Correo:</label>
          <input type="email" id="correo" name="correo" />

          <div className="button-group">
            <button>Agregar</button>
            <button>Editar</button>
            <button>Borrar</button>
          </div>
        </div>
      )}

      {selectedForm === 'asunto' && (
        <div className="form-container-crud">
          <label htmlFor="id">ID:</label>
          <input type="text" id="id" name="id" />
          <label htmlFor="descripcion">Descripción:</label>
          <input type="text" id="descripcion" name="descripcion" />

          <div className="button-group">
            <button>Agregar</button>
            <button>Editar</button>
            <button>Borrar</button>
          </div>
        </div>
      )}

      {selectedForm === 'nivel' && (
        <div className="form-container-crud">
          <label htmlFor="id">ID:</label>
          <input type="text" id="id" name="id" />
          <label htmlFor="descripcion">Descripción:</label>
          <input type="text" id="descripcion" name="descripcion" />

          <div className="button-group">
            <button>Agregar</button>
            <button>Editar</button>
            <button>Borrar</button>
          </div>
        </div>
      )}

      {selectedForm === 'estado' && (
        <div className="form-container-crud">
          <label htmlFor="id">ID:</label>
          <input type="text" id="id" name="id" />
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" />

          <div className="button-group">
            <button>Agregar</button>
            <button>Editar</button>
            <button>Borrar</button>
          </div>

        </div>
      )}

      {selectedForm === 'municipio' && (
        <div className="form-container-crud">
          <label htmlFor="id">ID:</label>
          <input type="text" id="id" name="id" />
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" />

          <label htmlFor="estado">Estado:</label>
          <select id="estado" name="estado">
            {/* Opciones para el combobox de estados */}
          </select>

          <div className="button-group">
            <button>Agregar</button>
            <button>Editar</button>
            <button>Borrar</button>
          </div>
        </div>
      )}

      {selectedForm === 'admin' && (
        <div className="form-container-crud">
          <label htmlFor="id">ID:</label>
          <input type="text" id="id" name="id" />
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />

          <div className="button-group">
            <button>Editar</button>
            <button>Borrar</button>
          </div>
        </div>
      )}
        </form>
      )}
    </div>
  );
};

export default CrudComponent;
