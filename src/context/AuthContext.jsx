import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/apiService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const savedToken = localStorage.getItem('authToken');
      const savedUser = localStorage.getItem('userData');

      if (savedToken && savedUser && !isTokenExpired(savedToken)) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } else {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (username, password) => {
    try {
      console.log('🔐 Intentando login...');
      const response = await authService.login(username, password);

      const accessToken = response.access_token;

      // ✅ Obtener perfil real del usuario
      const profileResponse = await fetch('https://app-interface-innpulse360-production.up.railway.app/api/v1/usuarios/me/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'accept': 'application/json',
        },
      });

      if (!profileResponse.ok) {
        throw new Error('No se pudo obtener el perfil del usuario');
      }

      const profile = await profileResponse.json();

      const userData = {
        id: profile.id_usuario,
        username: profile.login,
        email: profile.correo_electronico,
        role: profile.roles?.[0]?.rol || 'Usuario',
        token: accessToken,
      };

      setUser(userData);
      setToken(accessToken);
      localStorage.setItem('authToken', accessToken);
      localStorage.setItem('userData', JSON.stringify(userData));

      console.log('✅ Login completo:', userData);
      return { success: true, data: userData };
    } catch (error) {
      console.error('❌ Error en login:', error);
      let errorMessage = 'Error en el login';
      if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch'))
        errorMessage = 'Error de conexión. Verifica tu internet.';
      else if (error.message.includes('401'))
        errorMessage = 'Usuario o contraseña incorrectos';
      else errorMessage = error.message;

      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    console.log('🚪 Cerrando sesión...');
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!user && !!token && !isTokenExpired(token),
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
