import React, { useState } from 'react';
import '../styles/AlumnoStyle.css'; // Asegúrate de tener un archivo CSS para los estilos

const Alumno = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Inicializa el estado del formulario
    alumno: { curp: '', nombre: '', paterno: '', materno: '' },
    representante: { nombre: '', celular: '', telefono: '', correo: '' },
    estadoMunicipio: { estado: '', municipio: '' },
  });

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
      if (!formData.alumno.nombre || !formData.alumno.paterno || !formData.alumno.materno) {
        valid = false;
        newErrors.alumno.nombre = !formData.alumno.nombre;
        newErrors.alumno.paterno = !formData.alumno.paterno;
        newErrors.alumno.materno = !formData.alumno.materno;
        newErrors.alumno.curp = !formData.alumno.curp;
      }
    } else if (step === 2) {
      if (!formData.representante.nombre || !formData.representante.celular || !formData.representante.telefono || !formData.representante.correo) {
        valid = false;
        newErrors.representante.nombre = !formData.representante.nombre;
        newErrors.representante.celular = !formData.representante.celular;
        newErrors.representante.telefono = !formData.representante.telefono;
        newErrors.representante.correo = !formData.representante.correo;
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
      // Aquí puedes enviar formData a tu API usando fetch o axios
      console.log('Datos enviados:', formData);
      // Implementa lógica de envío a la API aquí
    }
  };

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
            {errors.alumno.curp && <span className="error-message">Este campo es obligatorio</span>}
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
      type="text"
      placeholder="Celular"
      value={formData.representante.celular}
      onChange={(e) => handleInputChange('representante', 'celular', e.target.value)}
      className={errors.representante.celular ? 'error' : ''}
    />
    {errors.representante.celular && <span className="error-message">Este campo es obligatorio</span>}
    <input
      type="text"
      placeholder="Teléfono"
      value={formData.representante.telefono}
      onChange={(e) => handleInputChange('representante', 'telefono', e.target.value)}
      className={errors.representante.telefono ? 'error' : ''}
    />
    {errors.representante.telefono && <span className="error-message">Este campo es obligatorio</span>}
    <input
      type="text"
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
      <option value="">Selecciona un estado</option>
      <option value="estado1">Estado 1</option>
      <option value="estado2">Estado 2</option>
      <option value="estado3">Estado 3</option>
      {/* Agrega más opciones según tus necesidades */}
    </select>
    {errors.estadoMunicipio.estado && <span className="error-message">Selecciona un estado</span>}
    <select
      value={formData.estadoMunicipio.municipio}
      onChange={(e) => handleInputChange('estadoMunicipio', 'municipio', e.target.value)}
      className={errors.estadoMunicipio.municipio ? 'error' : ''}
    >
      <option value="">Selecciona un municipio</option>
      {/* Las opciones para municipio se llenarán dinámicamente en función del estado seleccionado en el primer combobox */}
      {/* Opciones para el combobox de municipio */}
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
