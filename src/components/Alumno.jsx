import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/AlumnoStyle.css"; // Asegúrate de tener un archivo CSS para los estilos
import { listEstado } from "../services/estado.services";
import { listMunicipiosByIdEstado } from "../services/municipio.services";
import { registerAlumno } from "../services/alumno.services";
import {
  registerRepresentante,
  listRepresentante,
} from "../services/representante.services";
import { listNivel } from "../services/nivel.services";
import { listAsunto } from "../services/asunto.services";
import { registerTurno } from "../services/turno.services";

const Alumno = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Inicializa el estado del formulario
    alumno: { curp: "", nombre: "", paterno: "", materno: "" },
    representante: { nombre: "", celular: "", telefono: "", correo: "" },
    estadoMunicipio: { estado: "", municipio: "" },
    asunto: { descripcion: false },
    nivel: { descripcion: false },
  });

  const [errors, setErrors] = useState({
    alumno: { curp: false, nombre: false, paterno: false, materno: false },
    representante: {
      nombre: false,
      celular: false,
      telefono: false,
      correo: false,
    },
    estadoMunicipio: { estado: false, municipio: false },
    asunto: { descripcion: false },
    nivel: { descripcion: false },
  });

  const [step, setStep] = useState(1);
  const [estados, setEstados] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [asuntos, setAsuntos] = useState([]);
  const [niveles, setNiveles] = useState([]);

  const getRepresentanteId = async (nombre) => {
    try {
      // Obtener la lista de representantes
      const response = await listRepresentante();
      const representantes = await response.json();

      // Buscar el representante por nombre
      const representanteEncontrado = representantes.find(
        (rep) => rep.nombre === nombre
      );

      if (representanteEncontrado) {
        return representanteEncontrado;
      } else {
        console.error("Representante no encontrado");
        // Puedes manejar el caso en que el representante no se encuentre
        // Puedes lanzar un error, devolver un valor predeterminado, etc.
        return null;
      }
    } catch (error) {
      console.error("Error al obtener el representante", error);
      // Puedes manejar el error de alguna manera, por ejemplo, mostrando un mensaje al usuario
      throw error;
    }
  };

  const handleInputChange = (form, field, value) => {
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
      if (
        !formData.alumno.curp ||
        !/^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]{2}$/.test(formData.alumno.curp)
      ) {
        valid = false;
        newErrors.alumno.curp = true;
      }
      if (
        !formData.alumno.nombre ||
        !formData.alumno.paterno ||
        !formData.alumno.materno
      ) {
        valid = false;
        newErrors.alumno.nombre = !formData.alumno.nombre;
        newErrors.alumno.paterno = !formData.alumno.paterno;
        newErrors.alumno.materno = !formData.alumno.materno;
        newErrors.alumno.curp = !formData.alumno.curp;
      }
    } else if (step === 2) {
      if (
        !formData.representante.nombre ||
        !formData.representante.celular ||
        !/^\d{10}$/.test(formData.representante.celular) ||
        !/^\d{10}$/.test(formData.representante.telefono) ||
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
          formData.representante.correo
        )
      ) {
        valid = false;
        newErrors.representante.nombre = !formData.representante.nombre;
        newErrors.representante.celular = !/^\d{10}$/.test(
          formData.representante.celular
        );
        newErrors.representante.telefono = !/^\d{10}$/.test(
          formData.representante.telefono
        );
        newErrors.representante.correo =
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
            formData.representante.correo
          );
      }
    } else if (step === 3) {
      if (
        !formData.estadoMunicipio.estado ||
        !formData.estadoMunicipio.municipio
      ) {
        valid = false;
        newErrors.estadoMunicipio.estado = !formData.estadoMunicipio.estado;
        newErrors.estadoMunicipio.municipio =
          !formData.estadoMunicipio.municipio;
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

  const submitAlumno = async () => {
    const isValid = validateStep();
    if (isValid) {
      registerAlumno(formData.alumno)
        .then((response) => {
          if (response.ok) {
            Swal.fire({
              icon: "success",
              title: "Exito",
              text: "Datos ingresados exitosamente",
            });
          } else {
            throw new Error("Error al insertar datos en la tabla de Alumnos");
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "warning",
            title: "Advertencia",
            text: "Los datos no fueron ingresados de manera correcta, vuelva a revisarlos",
          });
        });
    }
    handleNext();
  };

  const submitRep = async () => {
    const isValid = validateStep();
    if (isValid) {
      registerRepresentante(formData.representante)
        .then((response) => {
          if (response.ok) {
            Swal.fire({
              icon: "success",
              title: "Exito",
              text: "Datos ingresados exitosamente",
            });
          } else {
            throw new Error("Error al insertar datos en la tabla de Alumnos");
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "warning",
            title: "Advertencia",
            text: "Los datos no fueron ingresados de manera correcta, vuelva a revisarlos",
          });
        });
    }
    handleNext();
  };

  const handleSubmit = async () => {
    // Función para manejar el envío del formulario
    const idRep = await getRepresentanteId(formData.representante.nombre);

    if (!idRep) {
      throw new Error("No se encontró un representante con ese nombre.");
    }

    const isValid = validateStep();
    if (isValid) {
      const data = {
        nombre_realiza_tramite: idRep.idRep,
        curp_alumno: formData.alumno.curp,
        municipio: formData.estadoMunicipio.municipio,
        nivel: formData.nivel.descripcion,
        asunto: formData.asunto.descripcion,
      };
      try {
        console.log(data);
        await registerTurno(data);
        console.log("Datos enviados:", formData);
      } catch (error) {
        console.error("Error al registrar turno:", error);
        // Aquí puedes manejar el error de alguna manera, mostrar un mensaje al usuario, etc.
      }
    }
    navigate("/");
  };

  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const response = await listEstado();
        const estadosData = await response.json();
        setEstados(estadosData);
      } catch (error) {
        console.error("Error al obtener estados", error);
      }
    };

    const fetchMunicipios = async (estadoId) => {
      try {
        const response = await listMunicipiosByIdEstado(estadoId);
        const municipiosData = await response.json();
        setMunicipios(municipiosData);
      } catch (error) {
        console.error("Error al obtener municipios", error);
      }
    };

    // Cargar datos para el select de Asunto
    const fetchAsuntos = async () => {
      try {
        const response = await listAsunto();
        const asuntosData = await response.json();
        setAsuntos(asuntosData);
      } catch (error) {
        console.error("Error al obtener asuntos", error);
      }
    };

    // Cargar datos para el select de Nivel
    const fetchNiveles = async () => {
      try {
        const response = await listNivel();
        const nivelesData = await response.json();
        setNiveles(nivelesData);
      } catch (error) {
        console.error("Error al obtener los niveles", error);
      }
    };

    fetchEstados();
    if (formData.estadoMunicipio.estado) {
      fetchMunicipios(formData.estadoMunicipio.estado);
    }
    fetchAsuntos();
    fetchNiveles();
  }, [formData.estadoMunicipio.estado]);

  return (
    <div className="container">
      <div className="progress-bar">
        <div className={`progress-bar-step ${step >= 1 ? "active" : ""}`}></div>
        <div className={`progress-bar-step ${step >= 2 ? "active" : ""}`}></div>
        <div className={`progress-bar-step ${step >= 3 ? "active" : ""}`}></div>
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
              onChange={(e) =>
                handleInputChange("alumno", "curp", e.target.value)
              }
              className={errors.alumno.curp ? "error" : ""}
            />
            {errors.alumno.curp && (
              <span className="error-message">Ingresa una CURP válida</span>
            )}
            <input
              type="text"
              placeholder="Nombre"
              value={formData.alumno.nombre}
              onChange={(e) =>
                handleInputChange("alumno", "nombre", e.target.value)
              }
              className={errors.alumno.nombre ? "error" : ""}
            />
            {errors.alumno.nombre && (
              <span className="error-message">Este campo es obligatorio</span>
            )}
            <input
              type="text"
              placeholder="Apellido Paterno"
              value={formData.alumno.paterno}
              onChange={(e) =>
                handleInputChange("alumno", "paterno", e.target.value)
              }
              className={errors.alumno.paterno ? "error" : ""}
            />
            {errors.alumno.paterno && (
              <span className="error-message">Este campo es obligatorio</span>
            )}
            <input
              type="text"
              placeholder="Apellido Materno"
              value={formData.alumno.materno}
              onChange={(e) =>
                handleInputChange("alumno", "materno", e.target.value)
              }
              className={errors.alumno.materno ? "error" : ""}
            />
            {errors.alumno.materno && (
              <span className="error-message">Este campo es obligatorio</span>
            )}
            <button onClick={submitAlumno}>Siguiente</button>
          </div>
        )}

        {step === 2 && (
          <div className="form">
            <h2>Representante</h2>
            <input
              type="text"
              placeholder="Nombre"
              value={formData.representante.nombre}
              onChange={(e) =>
                handleInputChange("representante", "nombre", e.target.value)
              }
              className={errors.representante.nombre ? "error" : ""}
            />
            {errors.representante.nombre && (
              <span className="error-message">Este campo es obligatorio</span>
            )}
            <input
              type="number"
              placeholder="Celular"
              value={formData.representante.celular}
              onChange={(e) =>
                handleInputChange("representante", "celular", e.target.value)
              }
              className={errors.representante.celular ? "error" : ""}
            />
            {errors.representante.celular && (
              <span className="error-message">
                Ingresa un número de celular válido
              </span>
            )}
            <input
              type="number"
              placeholder="Teléfono"
              value={formData.representante.telefono}
              onChange={(e) =>
                handleInputChange("representante", "telefono", e.target.value)
              }
              className={errors.representante.telefono ? "error" : ""}
            />
            {errors.representante.telefono && (
              <span className="error-message">
                Ingresa un número de teléfono válido
              </span>
            )}
            <input
              type="email"
              placeholder="Correo"
              value={formData.representante.correo}
              onChange={(e) =>
                handleInputChange("representante", "correo", e.target.value)
              }
              className={errors.representante.correo ? "error" : ""}
            />
            {errors.representante.correo && (
              <span className="error-message">Este campo es obligatorio</span>
            )}
            <div className="buttons-container">
              {step > 1 && (
                <button onClick={handlePrevious} className="button-container">
                  Retroceder
                </button>
              )}
              {step < 3 && (
                <button onClick={submitRep} className="button-container">
                  Siguiente
                </button>
              )}
            </div>
            {errors.representante.correo && (
              <span className="error-message">Ingresa un correo válido</span>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="form">
            <h2>Estado y Municipio</h2>
            <select
              value={formData.estadoMunicipio.estado}
              onChange={(e) =>
                handleInputChange("estadoMunicipio", "estado", e.target.value)
              }
              className={errors.estadoMunicipio.estado ? "error" : ""}
            >
              <option value="">Selecciona un estado</option>
              {estados.map((estado) => (
                <option key={estado.idEstado} value={estado.idEstado}>
                  {estado.nombre}
                </option>
              ))}
            </select>
            {errors.estadoMunicipio.estado && (
              <span className="error-message">Selecciona un estado</span>
            )}

            <select
              value={formData.estadoMunicipio.municipio}
              onChange={(e) =>
                handleInputChange(
                  "estadoMunicipio",
                  "municipio",
                  e.target.value
                )
              }
              className={errors.estadoMunicipio.municipio ? "error" : ""}
            >
              <option value="">Selecciona un municipio</option>
              {municipios.map((municipio) => (
                <option
                  key={municipio.idMunicipio}
                  value={municipio.idMunicipio}
                >
                  {municipio.nombre}
                </option>
              ))}
            </select>
            {errors.estadoMunicipio.municipio && (
              <span className="error-message">Selecciona un municipio</span>
            )}

            <h2>Asunto y Nivel</h2>
            <select
              value={formData.asunto.descripcion}
              onChange={(e) =>
                handleInputChange("asunto", "descripcion", e.target.value)
              }
              className={errors.asunto.descripcion ? "error" : ""}
            >
              <option value="">Selecciona un asunto</option>
              {asuntos.map((asunto) => (
                <option key={asunto.idAsunto} value={asunto.idAsunto}>
                  {asunto.descripcion}
                </option>
              ))}
            </select>
            {errors.asunto.descripcion && (
              <span className="error-message">Selecciona un asunto</span>
            )}

            <select
              value={formData.nivel.descripcion}
              onChange={(e) =>
                handleInputChange("nivel", "descripcion", e.target.value)
              }
              className={errors.nivel.descripcion ? "error" : ""}
            >
              <option value="">Selecciona un nivel</option>
              {niveles.map((nivel) => (
                <option key={nivel.idNivel} value={nivel.idNivel}>
                  {nivel.descripcion}
                </option>
              ))}
            </select>
            {errors.nivel.descripcion && (
              <span className="error-message">Selecciona un nivel</span>
            )}

            <div className="buttons-container">
              {step > 2 && (
                <button onClick={handlePrevious} className="button-container">
                  Retroceder
                </button>
              )}
              {step <= 4 && (
                <button onClick={handleSubmit} className="button-container">
                  Enviar
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alumno;
