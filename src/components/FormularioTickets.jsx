import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Swal from 'sweetalert2';
import '../styles/FormStyle.css';
import { registerTurno } from '../services/turno.services'
import { listMunicipio } from '../services/municipio.services';
import { listNivel } from '../services/nivel.services';
import { useState, useEffect } from 'react';
import { listAsunto } from '../services/asunto.services';


const RegistroTickets = () => {

    const { handleSubmit, register, formState: { errors } } = useForm();

        const [niveles, setNiveles] = useState([]);
        const [municipios, setMunicipios] = useState([]);
        const [asuntos, setAsuntos] = useState([]);

        // Resto del código...
        useEffect(() => {
            // Cargar datos para el select de Nivel
            const fetchNiveles = async () => {
                try {
                    const response = await listNivel();
                    const nivelesData = await response.json();
                    setNiveles(nivelesData);
                } catch (error) {
                    console.error('Error al obtener los niveles', error);
                }
            };
            // Cargar datos para el select de Municipio usando la función listMunicipio
            const fetchMunicipios = async () => {
                try {
                    const response = await listMunicipio();
                    const municipiosData = await response.json();
                    setMunicipios(municipiosData);
                } catch (error) {
                    console.error('Error al obtener municipios', error);
                }
            };


            // Cargar datos para el select de Asunto
            const fetchAsuntos = async () => {
                try {
                    const response = await listAsunto();
                    const asuntosData = await response.json();
                    setAsuntos(asuntosData);
                } catch (error) {
                    console.error('Error al obtener asuntos', error);
                }
            };

            // Llama a la función para cargar los municipios
            fetchMunicipios();
            fetchNiveles();
            fetchAsuntos();
        }, []);

    

    const onSubmit = async (data) => {
        await registerTurno(data);
        Swal.fire({
            icon: 'success',
            title: 'Alumno registrado',
            html: `
                <p>Datos del alumno</p>
                <p><strong>CURP:</strong> ${data.curp}</p>
                <p><strong>Nivel:</strong> ${data.nivel}</p>
                <p><strong>Municipio:</strong> ${data.municipio}</p>
                <p><strong>Asunto:</strong> ${data.asunto}</p>
            `,
        });
    };

    return (
        <div className="container">
            <h1>Ticket de turno</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="nombre_realiza_tramite">Nombre completo de quien realizará el trámite:</label>
                <input
                    type='text'
                    {...register("nombre_realiza_tramite", {
                        required: {
                            value: true,
                            message: "Rellene el campo vacio"
                        },
                        pattern: {
                            /* value: /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ]+ [A-Za-záéíóúüñÁÉÍÓÚÜÑ]+$/,
                         message: "Digite su nombre completo (primer nombre y primer apellido)"*/
                        },
                    })}
                />
                {
                    errors.nombre_realiza_tramite && <span>{errors.nombre_realiza_tramite.message}</span>
                }
                <label htmlFor="curp">CURP:</label>
                <input
                    type='text'
                    {...register("curp", {
                        required: {
                            value: "true",
                            message: "Digite la CURP del alumno"
                        },
                        pattern: {
                            value: /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]{2}$/,
                            message: "CURP no valida"
                        },
                    })}
                />
                {
                    errors.curp && <span>{errors.curp.message}</span>
                }
                { } <label htmlFor="nombre">Nombre:</label>
                <input
                    type='text'
                    {...register("nombre", {
                        required: {
                            value: "true",
                            message: "Digite el nombre del alumno"
                        },
                        minLength: {
                            value: 2,
                            message: "Debe de ser de más de dos caracteres"
                        },
                        maxLength: {
                            value: 15,
                            message: "Debe de ser de menos de quince caracteres"
                        }
                    })}
                />
                {
                    errors.nombre && <span>{errors.nombre.message}</span>
                }
                <label htmlFor="paterno">Paterno:</label>
                <input
                    type='text'
                    {...register("paterno", {
                        required: {
                            value: "true",
                            message: "Digite el primer apellido del alumno"
                        },
                        minLength: {
                            value: 2,
                            message: "Debe de ser de más de dos caracteres"
                        },
                        maxLength: {
                            value: 15,
                            message: "Debe de ser de menos de quince caracteres"
                        }
                    })}
                />
                {
                    errors.paterno && <span>{errors.paterno.message}</span>
                }
                <label htmlFor="materno">Materno:</label>
                <input
                    type='text'
                    {...register("materno", {
                        required: {
                            value: "true",
                            message: "Digite el segundo apellido del alumno"
                        },
                        minLength: {
                            value: 2,
                            message: "Debe de ser de más de dos caracteres"
                        },
                        maxLength: {
                            value: 15,
                            message: "Debe de ser de menos de quince caracteres"
                        }
                    })}
                />
                {
                    errors.materno && <span>{errors.materno.message}</span>
                }
                <label htmlFor="telefono">Teléfono:</label>
                <input
                    type='number'
                    {...register("telefono", {
                        required: {
                            value: true,
                            message: "Digite su telefono"
                        },
                        minLength: {
                            value: 10,
                            message: "Minimo 10 caracteres"
                        },
                        maxLength: {
                            value: 10,
                            message: "Maximo 10 caracteres"
                        }
                    })}
                />
                {
                    errors.telefono && <span>{errors.telefono.message}</span>
                }
                <label htmlFor="celular">Celular:</label>
                <input
                    type='number'
                    {...register("celular", {
                        required: {
                            value: true,
                            message: "Digite su celular"
                        },
                        minLength: {
                            value: 10,
                            message: "Minimo 10 caracteres"
                        },
                        maxLength: {
                            value: 10,
                            message: "Maximo 10 caracteres"
                        }
                    })}
                />
                {
                    errors.celular && <span>{errors.celular.message}</span>
                }
                <label htmlFor="correo">Correo:</label>
                <input
                    type='email'
                    {...register("correo", {
                        required: {
                            value: 'true',
                            message: 'Rellene el campo vacio'
                        },
                        pattern: {
                            value: /[a-zA-Z0-9._]+@[a-zA-Z0-9._]+\.[a-zA-Z]{2,4}$/,
                            message: 'Digite un correo valido'
                        }
                    })}
                />
                {
                    errors.correo && <span>{errors.correo.message}</span>
                }
            
                <select
                    {...register("nivel", {
                        validate: (value) => {
                            return value !== 'seleccionar' || 'Selecciona un nivel';
                        }
                    })}
                >
                    <option value="seleccionar">Seleccionar</option>
                    {niveles.map((nivel) => (
                        <option key={nivel.idNivel} value={nivel.idNivel}>{nivel.descripcion}</option>
                    ))}
                </select>
                {errors.nivel && <span>{errors.nivel.message}</span>}

                <select
                    {...register("municipio", {
                        validate: (value) => {
                            return value !== 'seleccionar' || 'Selecciona un municipio';
                        }
                    })}
                >
                    <option value="seleccionar">Seleccionar</option>
                    {municipios.map((municipio) => (
                        <option key={municipio.idMunicipio} value={municipio.idMunicipio}>{municipio.nombre}</option>
                    ))}
                </select>
                {errors.municipio && <span>{errors.municipio.message}</span>}

                <select
                    {...register("asunto", {
                        validate: (value) => {
                            return value !== 'seleccionar' || 'Selecciona un asunto';
                        }
                    })}
                >
                    <option value="seleccionar">Seleccionar</option>
                    {asuntos.map((asunto) => (
                        <option key={asunto.idAsunto} value={asunto.idAsunto}>{asunto.descripcion}</option>
                    ))}
                </select>
                {errors.asunto && <span>{errors.asunto.message}</span>}

                <button type="submit" className="btn-submit">Generar Turno</button>
            </form>
        </div>
    );
};

export default RegistroTickets;
