// services/puestoService.js
const API_BASE_URL = 'https://app-interface-innpulse360-production.up.railway.app/api/v1';

const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// GET ALL PUESTOS
export const obtenerPuestos = async (skip = 0, limit = 100) => {
  try {
    const token = getAuthToken();
    
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(
      `${API_BASE_URL}/puesto/?skip=${skip}&limit=${limit}`,
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
    console.error('Error en obtenerPuestos:', error);
    throw error;
  }
};

// DETAIL PUESTO//
export const obtenerPuestoPorId = async (id) => {
  try {
    const token = getAuthToken();
    
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/puesto/${id}`, {
      method: 'GET',
      headers: headers,
    });
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error en obtenerPuestoPorId:', error);
    throw error;
  }
};

// CREAR PUESTO
export const crearPuesto = async (puestoData) => {
  try {
    const token = getAuthToken();
    
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/puesto/`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(puestoData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status}: ${JSON.stringify(errorData)}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error en crearPuesto:', error);
    throw error;
  }
};




// ACTUALIZAR PUESTO
export const actualizarPuesto = async (id, puestoData) => {
  try {
    const token = getAuthToken();
    
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/puesto/${id}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(puestoData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status}: ${JSON.stringify(errorData)}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error en actualizarPuesto:', error);
    throw error;
  }
};
// ELIMINAR PUESTO
export const eliminarPuesto = async (id) => {
  try {
    const token = getAuthToken();
    
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/puesto/${id}`, {
      method: 'DELETE',
      headers: headers,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status}: ${JSON.stringify(errorData)}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error en eliminarPuesto:', error);
    throw error;
  }
};