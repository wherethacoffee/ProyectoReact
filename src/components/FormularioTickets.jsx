import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../styles/FormStyle.css';

const RegistroTickets = () => {
    // Define estados para los campos del formulario
    const [nombre_realiza_tramite, setNombreRealizaTramite] = useState('');
    const [curp, setCurp] = useState('');
    const [nombre, setNombre] = useState('');
    const [paterno, setPaterno] = useState('');
    const [materno, setMaterno] = useState('');
    const [telefono, setTelefono] = useState('');
    const [celular, setCelular] = useState('');
    const [correo, setCorreo] = useState('');
    const [nivel, setNivel] = useState('Seleccionar');
    const [municipio, setMunicipio] = useState('Seleccionar');
    const [asunto, setAsunto] = useState('Seleccionar');

    // Manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nombre_realiza_tramite || !curp || !nombre || !paterno || 
            !materno || !telefono || !celular || !correo || 
            nivel === 'Seleccionar' || municipio === 'Seleccionar' || asunto === 'Seleccionar') {
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Rellene todos los campos',
            });
            return;
        }

        // Puedes agregar más validaciones según tus necesidades aquí

        // Luego puedes hacer lo que desees con los datos del formulario

        Swal.fire({
            icon: 'success',
            title: 'Solicitud registrada',
            text: 'La solicitud ha sido registrada exitosamente',
        });
    }

    return (
        <div className="container">
            <h1>Solicitud de Trámite</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nombre_realiza_tramite">Nombre completo de quien realizara el tramite:</label>
                <input
                    type="text"
                    id="nombre_realiza_tramite"
                    name="nombre_realiza_tramite"
                    value={nombre_realiza_tramite}
                    onChange={(e) => setNombreRealizaTramite(e.target.value)}
                />

                <label htmlFor="curp">CURP:</label>
                <input
                    type="text"
                    id="curp"
                    name="curp"
                    value={curp}
                    onChange={(e) => setCurp(e.target.value)}
                />

                <label htmlFor="nombre">Nombre:</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />

                <label htmlFor="paterno">Paterno:</label>
                <input
                    type="text"
                    id="paterno"
                    name="paterno"
                    value={paterno}
                    onChange={(e) => setPaterno(e.target.value)}
                />

                <label htmlFor="materno">Materno:</label>
                <input
                    type="text"
                    id="materno"
                    name="materno"
                    value={materno}
                    onChange={(e) => setMaterno(e.target.value)}
                />

                <label htmlFor="telefono">Teléfono:</label>
                <input
                    type="text"
                    id="telefono"
                    name="telefono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                />

                <label htmlFor="celular">Celular:</label>
                <input
                    type="text"
                    id="celular"
                    name="celular"
                    value={celular}
                    onChange={(e) => setCelular(e.target.value)}
                />

                <label htmlFor="correo">Correo:</label>
                <input
                    type="text"
                    id="correo"
                    name="correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                />

                <label htmlFor="nivel">Nivel al que desea ingresar o que ya cursa el alumno:</label>
                <select
                    id="nivel"
                    name="nivel"
                    value={nivel}
                    onChange={(e) => setNivel(e.target.value)}
                >
                    <option value="Seleccionar">Seleccionar</option>
                    <option value="Primaria">Primaria</option>
                    <option value="Secundaria">Secundaria</option>
                    <option value="Preparatoria">Preparatoria</option>
                    <option value="Licenciatura">Licenciatura</option>
                </select>

                <label htmlFor="municipio">Municipio donde desea que estudie el alumno:</label>
                <select
                    id="municipio"
                    name="municipio"
                    value={municipio}
                    onChange={(e) => setMunicipio(e.target.value)}
                >
                    <option value="Seleccionar">Seleccionar</option>
                    <option value="Saltillo">Saltillo</option>
                    <option value="Ramos Arizpe">Ramos Arizpe</option>
                    <option value="Parras">Parras</option>
                </select>

                <label htmlFor="asunto">Seleccione el asunto que va a tratar:</label>
                <select
                    id="asunto"
                    name="asunto"
                    value={asunto}
                    onChange={(e) => setAsunto(e.target.value)}
                >
                    <option value="Seleccionar">Seleccionar</option>
                    <option value="Entrega de documentos">Entrega de documentos</option>
                    <option value="Baja académica">Baja académica</option>
                </select>

                <button type="submit">Generar Turno</button>
            </form>
        </div>
    );
};

export default RegistroTickets;
