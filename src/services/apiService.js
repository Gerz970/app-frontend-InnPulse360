const API_BASE_URL = 'https://app-interface-innpulse360-production.up.railway.app/api/v1';


export const authService = {
  login: async (login, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/login`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: login,
          password: password
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Error en el login');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en authService:', error);
      throw error;
    }
  }
};

// Interceptor para agregar el token a las requests
export const apiClient = {
  get: async (endpoint, token = null) => {
    const headers = {
      'accept': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, { headers });
    return handleResponse(response);
  },

  post: async (endpoint, data, token = null) => {
    const headers = {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  }
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Error en la petición');
  }
  return response.json();
};