import React, { useState, useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/AlumnoStyle.css'; // Asegúrate de tener un archivo CSS para los estilos
import { listEstado } from '../services/estado.services';
import { listMunicipiosByIdEstado } from '../services/municipio.services';
import { registerAlumno } from '../services/alumno.services';
import { registerRepresentante } from '../services/representante.services';

const Alumno = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Inicializa el estado del formulario
    alumno: { curp: '', nombre: '', paterno: '', materno: '' },
    representante: { nombre: '', celular: '', telefono: '', correo: '' },
    estadoMunicipio: { estado: '', municipio: '' },
  });
  const [estados, setEstados] = useState([]);
  const [municipios, setMunicipios] = useState([]);


  const [errors, setErrors] = useState({
    alumno: { curp: false,nombre: false, paterno: false, materno: false },
    representante: { nombre: false, celular: false, telefono: false, correo: false },
    estadoMunicipio: { estado: false, municipio: false },
  });

  const handleInputChange = (form, field, value) => {
    // Función para manejar cambios en los campos de entrada
    setFormData({
      ...formData,
      [form]: {
        ...formData[form],
        [field]: value,
      },
    });
  };

  const validateStep = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (step === 1) {
      if (!formData.alumno.curp || !/^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]{2}$/.test(formData.alumno.curp)) {
        valid = false;
        newErrors.alumno.curp = true;
      }
      if (!formData.alumno.nombre || !formData.alumno.paterno || !formData.alumno.materno) {
        valid = false;
        newErrors.alumno.nombre = !formData.alumno.nombre;
        newErrors.alumno.paterno = !formData.alumno.paterno;
        newErrors.alumno.materno = !formData.alumno.materno;
        newErrors.alumno.curp = !formData.alumno.curp;
      }
    } else if (step === 2) {
      if (!formData.representante.nombre || !formData.representante.celular || !/^\d{10}$/.test(formData.representante.celular) || !/^\d{10}$/.test(formData.representante.telefono) 
          || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.representante.correo)) {
        valid = false;
        newErrors.representante.nombre = !formData.representante.nombre;
        newErrors.representante.celular = !/^\d{10}$/.test(formData.representante.celular);
        newErrors.representante.telefono = !/^\d{10}$/.test(formData.representante.telefono);
        newErrors.representante.correo = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.representante.correo);
      }
    } else if (step === 3) {
      if (!formData.estadoMunicipio.estado || !formData.estadoMunicipio.municipio) {
        valid = false;
        newErrors.estadoMunicipio.estado = !formData.estadoMunicipio.estado;
        newErrors.estadoMunicipio.municipio = !formData.estadoMunicipio.municipio;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleNext = () => {
    // Función para manejar el clic en el botón "Siguiente"
    const isValid = validateStep();
    if (isValid) {
      setStep(step + 1);
    }
  };
  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    // Función para manejar el envío del formulario
    const isValid = validateStep();
    if (isValid) {
      console.log('Datos enviados:', formData);
      registerAlumno(formData.alumno)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error al insertar datos en la tabla de Alumnos');
        }
      })
      .then((alumnoData) => {
        // Alumno insertado correctamente, ahora inserta datos en la tabla de Representantes
        registerRepresentante(formData.representante)
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Error al insertar datos en la tabla de Representantes');
            }
          })
          .then((representanteData) => {
            // Ambos registros (Alumno y Representante) se han insertado correctamente
            Swal.fire({
              icon: 'success',
              title: 'Exito',
              text: 'Datos ingresados exitosamente'
            })
          })
          .catch((error) => {
            Swal.fire({
              icon: 'warning',
              title: 'Advertencia',
              text: 'Los datos no fueron ingresados de manera correcta, vuelva a revisarlos'
            })
          });
      })
      .catch((error) => {
        console.error(error);
      });
    }
    navigate('/')
  };

  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const response = await listEstado();
        const estadosData = await response.json();
        setEstados(estadosData);
      } catch (error) {
        console.error('Error al obtener estados', error);
      }
    };
  
    const fetchMunicipios = async (estadoId) => {
      try {
        const response = await listMunicipiosByIdEstado(estadoId);
        const municipiosData = await response.json();
        setMunicipios(municipiosData);
      } catch (error) {
        console.error('Error al obtener municipios', error);
      }
    };

    fetchEstados(); 
    if (formData.estadoMunicipio.estado) {
      fetchMunicipios(formData.estadoMunicipio.estado);
    }
  }, [formData.estadoMunicipio.estado]);

  return (
    <div className="container">
      <div className="progress-bar">
        <div className={`progress-bar-step ${step >= 1 ? 'active' : ''}`}></div>
        <div className={`progress-bar-step ${step >= 2 ? 'active' : ''}`}></div>
        <div className={`progress-bar-step ${step >= 3 ? 'active' : ''}`}></div>
      </div>
      <div className="form-container-alumnos">
        <h1>Alumno Nuevo</h1>

        {step === 1 && (
          <div className="form">
            <h2>Alumno</h2>
            <input
              type="text"
                placeholder="CURP"
                value={formData.alumno.curp}
                onChange={(e) => handleInputChange('alumno', 'curp', e.target.value)}
                className={errors.alumno.curp ? 'error' : ''}
            />
            {errors.alumno.curp && <span className="error-message">Ingresa una CURP válida</span>}
            <input
              type="text"
              placeholder="Nombre"
              value={formData.alumno.nombre}
              onChange={(e) => handleInputChange('alumno', 'nombre', e.target.value)}
              className={errors.alumno.nombre ? 'error' : ''}
            />
            {errors.alumno.nombre && <span className="error-message">Este campo es obligatorio</span>}
            <input
              type="text"
              placeholder="Apellido Paterno"
              value={formData.alumno.paterno}
              onChange={(e) => handleInputChange('alumno', 'paterno', e.target.value)}
              className={errors.alumno.paterno ? 'error' : ''}
            />
            {errors.alumno.paterno && <span className="error-message">Este campo es obligatorio</span>}
            <input
              type="text"
              placeholder="Apellido Materno"
              value={formData.alumno.materno}
              onChange={(e) => handleInputChange('alumno', 'materno', e.target.value)}
              className={errors.alumno.materno ? 'error' : ''}
            />
            {errors.alumno.materno && <span className="error-message">Este campo es obligatorio</span>}
            <button onClick={handleNext}>Siguiente</button>
          </div>
        )}

{step === 2 && (
  <div className="form">
    <h2>Representante</h2>
    <input
      type="text"
      placeholder="Nombre"
      value={formData.representante.nombre}
      onChange={(e) => handleInputChange('representante', 'nombre', e.target.value)}
      className={errors.representante.nombre ? 'error' : ''}
    />
    {errors.representante.nombre && <span className="error-message">Este campo es obligatorio</span>}
    <input
      type="number"
      placeholder="Celular"
      value={formData.representante.celular}
      onChange={(e) => handleInputChange('representante', 'celular', e.target.value)}
      className={errors.representante.celular ? 'error' : ''}
    />
    {errors.representante.celular && <span className="error-message">Ingresa un número de celular válido</span>}
    <input
      type="number"
      placeholder="Teléfono"
      value={formData.representante.telefono}
      onChange={(e) => handleInputChange('representante', 'telefono', e.target.value)}
      className={errors.representante.telefono ? 'error' : ''}
    />
    {errors.representante.telefono && <span className="error-message">Ingresa un número de teléfono válido</span>}
    <input
      type="email"
      placeholder="Correo"
      value={formData.representante.correo}
      onChange={(e) => handleInputChange('representante', 'correo', e.target.value)}
      className={errors.representante.correo ? 'error' : ''}
    />
    {errors.representante.correo && <span className="error-message">Este campo es obligatorio</span>}
    <div className="buttons-container">
        {step > 1 && <button onClick={handlePrevious} className="button-container">Retroceder</button>}
        {step < 3 && <button onClick={handleNext} className="button-container">Siguiente</button>}
    </div> 
    {errors.representante.correo && <span className="error-message">Ingresa un correo válido</span>}
    <button onClick={handleNext}>Siguiente</button>
  </div>
)}

{step === 3 && (
  <div className="form">
    <h2>Estado y Municipio</h2>
    <select
      value={formData.estadoMunicipio.estado}
      onChange={(e) => handleInputChange('estadoMunicipio', 'estado', e.target.value)}
      className={errors.estadoMunicipio.estado ? 'error' : ''}
    >
      <option value="seleccionar">Selecciona un estado</option>
      {estados.map((estado) => (
        <option key={estado.idEstado} value={estado.idEstado}>
          {estado.nombre}
        </option>
      ))}
    </select>
    {errors.estadoMunicipio.estado && <span className="error-message">Selecciona un estado</span>}
    <select
      value={formData.estadoMunicipio.municipio}
      onChange={(e) => handleInputChange('estadoMunicipio', 'municipio', e.target.value)}
      className={errors.estadoMunicipio.municipio ? 'error' : ''}
    >
      <option value="">Selecciona un municipio</option>
        {municipios.map((municipio) => (
          <option key={municipio.idMunicipio} value={municipio.nombre}>
            {municipio.nombre}
      </option>
        ))}
    </select>
    {errors.estadoMunicipio.municipio && <span className="error-message">Selecciona un municipio</span>}
    <div className="buttons-container">
        {step > 2 && <button onClick={handlePrevious} className="button-container">Retroceder</button>}
        {step <= 3 && <button onClick={handleSubmit}className='button-container'>Enviar</button>}
    </div> 
    
  </div>
)}
      </div>
    </div>
  );
};

export default Alumno;

