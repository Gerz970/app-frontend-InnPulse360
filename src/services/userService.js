
const API_BASE = "https://app-interface-innpulse360-production.up.railway.app/api/v1/";

// Obtener el token correcto desde localStorage o sessionStorage
const getToken = () => localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

// Crear headers de autorización
const getAuthHeaders = () => {
  const token = getToken();
  if (!token) throw new Error("No hay token de autenticación. Por favor inicia sesión.");
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };
};

/**
 * Obtener los roles disponibles
 */



export async function getRolesUsuario(usuarioId) {
  try {
    const response = await fetch(`${API_BASE}/usuarios/${usuarioId}/with-roles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener roles del usuario ${usuarioId}: ${response.status}`);
    }

    const data = await response.json();
    return data; // Aquí viene el usuario con sus roles
  } catch (error) {
    console.error("Error en obtenerRolesPorUsuario:", error);
    throw error;
  }
}

export async function getRolesDisponibles() {
  try {
    const res = await fetch(`${API_BASE}roles/`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      if (res.status === 401) throw new Error("No autorizado. Por favor inicia sesión.");
      const errorData = await res.json();
      throw new Error(errorData.message || "Error al cargar roles");
    }

    return await res.json();
  } catch (error) {
    console.error("getRolesDisponibles:", error);
    throw error;
  }
}

/**
 * Obtener todos los usuarios
 */
export async function obtenerUsuarios() {
  try {
    const res = await fetch(`${API_BASE}usuarios/`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      if (res.status === 401) throw new Error("No autorizado. Por favor inicia sesión.");
      const errorData = await res.json();
      throw new Error(errorData.message || "Error al obtener usuarios");
    }
    return await res.json();
  } catch (error) {
    console.error("obtenerUsuarios:", error);
    throw error;
  }
}

/**
 * Eliminar un usuario por ID
 */
export async function eliminarUsuario(id) {
  try {
    const res = await fetch(`${API_BASE}usuarios/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      if (res.status === 401) throw new Error("No autorizado. Por favor inicia sesión.");
      const errorData = await res.json();
      throw new Error(errorData.message || "Error al eliminar usuario");
    }
    return true;
  } catch (error) {
    console.error("eliminarUsuario:", error);
    throw error;
  }
}

/**
 * Registrar un nuevo usuario
 */
export async function registrarUsuario(usuario) {
  try {
    const res = await fetch(`${API_BASE}usuarios/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(usuario),
    });

    if (!res.ok) {
      if (res.status === 401) throw new Error("No autorizado. Por favor inicia sesión.");
      const errorData = await res.json();
      throw new Error(errorData.message || "Error al registrar usuario");
    }

    return await res.json();
  } catch (error) {
    console.error("registrarUsuario:", error);
    throw error;
  }
}

/**
 * Verificar si el usuario está logueado
 */
export function isLoggedIn() {
  return !!getToken();
}

/**
 * Cerrar sesión
 */
export function logout() {
  localStorage.removeItem("authToken");
  sessionStorage.removeItem("authToken");
  window.location.href = "/login";
}
/**
 * Asignar múltiples roles a un usuario
 * @param {number} usuarioId - ID del usuario
 * @param {number[]} rolesIds - Array de IDs de roles
 */

export async function asignarRolesUsuario(usuarioId, rolesIds) {
  try {
    const resultados = [];

    for (const rolId of rolesIds) {
      const res = await fetch(`${API_BASE}usuarios/${usuarioId}/roles/${rolId}`, {
        method: "POST",
        headers: getAuthHeaders(),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `Error al asignar rol ${rolId} al usuario`);
      }

      resultados.push(await res.json());
    }

    return resultados; 
  } catch (error) {
    console.error("asignarRolesUsuario:", error);
    throw error;
  }
}


/**
 * Eliminar un rol específico de un usuario
 * @param {number} usuarioId - ID del usuario
 * @param {number} rolId - ID del rol
 */
export async function eliminarRolUsuario(usuarioId, rolId) {
  try {
    const res = await fetch(`${API_BASE}usuarios/${usuarioId}/roles/${rolId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      if (res.status === 401) throw new Error("No autorizado. Por favor inicia sesión.");
      const errorData = await res.json();
      throw new Error(errorData.message || "Error al eliminar rol del usuario");
    }

    return true;
  } catch (error) {
    console.error("eliminarRolUsuario:", error);
    throw error;
  }
}

/**
 * Modificar el rol de un usuario
 * @param {number} usuarioId - ID del usuario
 * @param {number} rolActualId - ID del rol actual
 * @param {number} rolNuevoId - ID del nuevo rol
 */
export async function modificarRolUsuario(usuarioId, rolActualId, rolNuevoId) {
  try {
    // Primero eliminamos el rol actual
    await eliminarRolUsuario(usuarioId, rolActualId);

    // Luego asignamos el nuevo rol
    const res = await fetch(`${API_BASE}usuarios/${usuarioId}/roles/${rolNuevoId}`, {
      method: "POST",
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error al asignar nuevo rol al usuario");
    }

    return await res.json();
  } catch (error) {
    console.error("modificarRolUsuario:", error);
    throw error;
  }
}
export const obtenerUsuarioPorLogin = async (login) => {
  const response = await fetch(`${API_BASE}/login/${login}`);
  if (!response.ok) {
    throw new Error("Error al obtener el usuario por login");
  }
  return response.json();
};

// Modificar usuario por id
export const actualizarUsuario = async (id_usuario, usuario) => {
  const response = await fetch(`${API_BASE}usuarios/${id_usuario}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
  if (!response.ok) {
    throw new Error("Error al modificar el usuario");
  }
  return response.json();
};

