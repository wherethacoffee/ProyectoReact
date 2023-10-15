const API = 'http://localhost:4000'

export const registerRequest = data => fetch(`${API}/turno/agregar`, { 
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
  })
 

  