import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Login from '../pages/Login/LoginPage';
import InicioPage from '../pages/InicioPage/Inicio'; // ← CAMBIADO
import Administrador from '../pages/Administrador/Administrador';
import Clientes from '../pages/Clientes/Clientes';
import Empleados from '../pages/Empleados/Empleados';

const AppRouter = () => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  console.log('📍 Ruta actual:', location.pathname);
  console.log('🔐 Usuario autenticado:', isAuthenticated);
  console.log('👤 Rol del usuario:', user?.role);

  // Función para obtener la ruta de inicio según el rol
  const getInicioPath = () => {
    switch(user?.role) {
      case 'Administrador':
        return '/admin/dashboard';
      case 'Recepcionista':
      case 'Limpieza':
      case 'Gerente':
        return '/empleado/dashboard';
      case 'Usuario':
        return '/cliente/dashboard';
      default:
        return '/login';
    }
  };

  return (
    <Routes>
      {/* Ruta pública */}
      <Route 
        path="/login" 
        element={
          !isAuthenticated ? <Login /> : <Navigate to={getInicioPath()} replace />
        } 
      />
      
      {/* Rutas de Admin */}
      <Route 
        path="/admin/*" 
        element={
          <ProtectedRoute allowedRoles={['Administrador']}>
            <Routes>
              <Route path="dashboard" element={<InicioPage />} /> {/* ← CAMBIADO */}
              <Route path="users" element={<Administrador />} />
              <Route path="clients" element={<Clientes />} />
              <Route path="reservations" element={<div>Reservaciones Admin</div>} />
              <Route path="rooms" element={<div>Habitaciones Admin</div>} />
              <Route path="reports" element={<div>Reportes Admin</div>} />
              <Route path="settings" element={<div>Configuración Admin</div>} />
              <Route path="" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </ProtectedRoute>
        } 
      />

      {/* Rutas de Empleado */}
      <Route 
        path="/empleado/*" 
        element={
          <ProtectedRoute allowedRoles={['Recepcionista', 'Limpieza', 'Gerente']}>
            <Routes>
              <Route path="dashboard" element={<InicioPage />} /> {/* ← CAMBIADO */}
              <Route path="clients" element={<Clientes />} />
              <Route path="reservations" element={<div>Reservaciones Empleado</div>} />
              <Route path="checkin" element={<div>Check-In</div>} />
              <Route path="checkout" element={<div>Check-Out</div>} />
              <Route path="cleaning" element={<div>Limpieza</div>} />
              <Route path="inventory" element={<div>Inventario</div>} />
              <Route path="" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </ProtectedRoute>
        } 
      />

      {/* Rutas de Gerente */}
      <Route 
        path="/gerente/*" 
        element={
          <ProtectedRoute allowedRoles={['Gerente']}>
            <Routes>
              <Route path="dashboard" element={<InicioPage />} /> {/* ← CAMBIADO */}
              <Route path="reservations" element={<div>Reservaciones Gerente</div>} />
              <Route path="rooms" element={<div>Habitaciones Gerente</div>} />
              <Route path="reports" element={<div>Reportes Gerente</div>} />
              <Route path="finance" element={<div>Finanzas Gerente</div>} />
              <Route path="" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </ProtectedRoute>
        } 
      />

      {/* Rutas de Cliente */}
      <Route 
        path="/cliente/*" 
        element={
          <ProtectedRoute allowedRoles={['Usuario']}>
            <Routes>
              <Route path="dashboard" element={<InicioPage />} /> {/* ← CAMBIADO */}
              <Route path="profile" element={<div>Perfil Cliente</div>} />
              <Route path="" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </ProtectedRoute>
        } 
      />

      {/* Ruta por defecto */}
      <Route 
        path="/" 
        element={
          isAuthenticated ? 
            <Navigate to={getInicioPath()} replace /> : 
            <Navigate to="/login" replace />
        } 
      />
      
      {/* Ruta 404 mejorada */}
      <Route path="*" element={
        <div style={{ padding: '2rem' }}>
          <h1>404 - Página No Encontrada</h1>
          <p>La ruta <strong>{location.pathname}</strong> no existe.</p>
          <p>Usuario: {user?.username} | Rol: {user?.role}</p>
          <button 
            onClick={() => window.location.href = isAuthenticated ? getInicioPath() : '/login'}
            style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            {isAuthenticated ? 'Ir al Inicio' : 'Ir al Login'} {/* ← CAMBIADO */}
          </button>
        </div>
      } />
    </Routes>
  );
};

export default AppRouter;