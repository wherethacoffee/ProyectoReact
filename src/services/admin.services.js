const API = 'https://apiticketturno-production.up.railway.app'

export const registerAdmin = data => fetch(`${API}/admin/agregar`, { 
    method: "POST",
    body: JSON.stringify({
        "username": data.username,
        "password": data.password
      }),
    headers: {
      "Content-Type": "application/json"
    }
  })

  export const listAdmins = () => fetch(`${API}/admin/listar`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  // Buscar un admin por ID
  export const findAdmin = (idAdmin) => fetch(`${API}/admin/buscar/${idAdmin}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  // Actualizar un admin por ID
  export const updateAdmin = (idAdmin, data) => fetch(`${API}/admin/actualizar/${idAdmin}`, {
    method: "PUT",
    body: JSON.stringify({
      "username": data.username,
      "password": data.password
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  // Eliminar un admin por ID
  export const deleteAdmin = (idAdmin) => fetch(`${API}/admin/eliminar/${idAdmin}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });