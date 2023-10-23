const API = 'https://apiticketturno-production.up.railway.app/turno'

export const registerTurno = data => fetch(`${API}/agregar`, { 
    method: "POST",
    body: JSON.stringify({
        "id_representante": data.nombre_realiza_tramite,
        "id_municipio": data.municipio,
        "id_status": 1,
        "id_asunto": data.asunto,
        "id_nivel": data.nivel,
        "curp_alumno": data.curp
      }),
    headers: {
      "Content-Type": "application/json"
    }
  });
 

  export const listTurno = () => fetch(`${API}/listar`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  // Buscar un turno por ID
  export const findTurno = (idTurno) => fetch(`${API}/buscar/${idTurno}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  // Actualizar un turno por ID
  export const updateTurno = (idTurno, data) => fetch(`${API}/actualizar/${idTurno}`, {
    method: "PUT",
    body: JSON.stringify({
      "id_representante": data.nombre_realiza_tramite,
      "id_municipio": data.municipio,
      "id_status": 1,
      "id_asunto": data.asunto,
      "id_nivel": data.nivel,
      "curp_alumno": data.curp
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  // Eliminar un turno por ID
  export const deleteTurno = (idTurno) => fetch(`${API}/eliminar/${idTurno}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });

  