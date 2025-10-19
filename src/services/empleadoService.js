// services/empleadoService.js

const API_BASE_URL = 'https://app-interface-innpulse360-production.up.railway.app/api/v1';

const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// GET ALL EMPLEADOS
export const obtenerEmpleados = async (skip = 0, limit = 100) => {
  try {
    const token = getAuthToken();
    
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(
      `${API_BASE_URL}/empleado/?skip=${skip}&limit=${limit}`,
      {
        method: 'GET',
        headers: headers,
      }
    );
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en obtenerEmpleados:', error);
    throw error;
  }
};

// GET EMPLEADO POR ID
export const obtenerEmpleadoPorId = async (id) => {
  try {
    const token = getAuthToken();
    
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/empleado/${id}`, {
      method: 'GET',
      headers: headers,
    });
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error en obtenerEmpleadoPorId:', error);
    throw error;
  }
};
// CREAR EMPLEADO
export const crearEmpleado = async (empleadoData) => {
  try {
    const token = getAuthToken();
    
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Validación frontend para CURP
    if (empleadoData.curp && empleadoData.curp.length !== 18) {
      throw new Error(`El CURP debe tener exactamente 18 caracteres. Tienes: ${empleadoData.curp.length}`);
    }

    const response = await fetch(`${API_BASE_URL}/empleado/`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(empleadoData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status}: ${JSON.stringify(errorData)}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error en crearEmpleado:', error);
    throw error;
  }
};
// UPDATE EMPLEADO
export const actualizarEmpleado = async (id, empleadoData) => {
  try {
    const token = getAuthToken();
    
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Validación frontend para CURP
    if (empleadoData.curp && empleadoData.curp.length !== 18) {
      throw new Error(`El CURP debe tener exactamente 18 caracteres. Tienes: ${empleadoData.curp.length}`);
    }

    const response = await fetch(`${API_BASE_URL}/empleado/${id}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(empleadoData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status}: ${JSON.stringify(errorData)}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error en actualizarEmpleado:', error);
    throw error;
  }
};

//DELTE EMPLEADO//
export const eliminarEmpleado = async (id) => {
  try {
    const token = getAuthToken();
    
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/empleado/${id}`, {
      method: 'DELETE',
      headers: headers,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status}: ${JSON.stringify(errorData)}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error en eliminarEmpleado:', error);
    throw error;
  }
};