// router/AppRouter.jsx
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Login from '../pages/Login/LoginPage';
import InicioPage from '../pages/InicioPage/Inicio';
import AdministracionUsuarios from '../pages/Registro/AdministracionUsuarios';
import RegistroUsuario from '../pages/Registro/RegistroUsuario';
import Clientes from '../pages/Clientes/Clientes';
import GestionEmpleados from '../pages/Administrador/GestionEmpleados/gestionEmpleados';
import GestionPuestos from '../pages/Administrador/GestionPuestos/gestionPuestos';

const AppRouter = () => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

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

  // Si está autenticado, usar la ruta actual o la de inicio por rol
  // Si no está autenticado, ir al login pero guardar la ruta actual
  const getRedirectPath = () => {
    if (isAuthenticated) {
      // Si ya está en una ruta válida, mantenerla, sino ir al dashboard según rol
      return location.pathname !== '/' && location.pathname !== '/login' 
        ? location.pathname 
        : getInicioPath();
    }
    return '/login';
  };

  return (
    <Routes>
      {/* Ruta pública - Login */}
      <Route 
        path="/login" 
        element={
          !isAuthenticated ? (
            <Login /> 
          ) : (
            <Navigate to={getRedirectPath()} replace />
          )
        } 
      />
      
      {/* Rutas de Admin */}
      <Route 
        path="/admin/*" 
        element={
          <ProtectedRoute allowedRoles={['Administrador']}>
            <Routes>
              <Route path="dashboard" element={<InicioPage />} />
              <Route path="users" element={<AdministracionUsuarios />} />
              <Route path="usersR" element={<RegistroUsuario />} />
              <Route path="clients" element={<Clientes />} />
              <Route path="reservations" element={<div>Reservaciones Admin</div>} />
              <Route path="rooms" element={<div>Habitaciones Admin</div>} />
              <Route path="reports" element={<div>Reportes Admin</div>} />
              <Route path="settings" element={<div>Configuración Admin</div>} />
              
              {/* Rutas de Gestión de Empleados */}
              <Route path="gestionEmpleados" element={<GestionEmpleados/>} />
              <Route path="empleados" element={<GestionEmpleados/>} />
              <Route path="empleados/crear" element={<div>Crear Empleado - Página separada</div>} />
              <Route path="modificarEmpleado/:id" element={<div>Modificar Empleado - Página separada</div>} />
              <Route path="empleados/asignar-puesto/:id" element={<div>Asignar Puesto - Página separada</div>} />
              <Route path="empleados/:id" element={<div>Detalles Empleado - Página separada</div>} />
               {/* Nuevas Rutas de Gestión de Puestos */}
              <Route path="gestionPuestos" element={<GestionPuestos />} />
              <Route path="puestos" element={<GestionPuestos />} />
              <Route path="puestos/crear" element={<div>Crear Puesto - Página separada</div>} />
              <Route path="puestos/modificar/:id" element={<div>Modificar Puesto - Página separada</div>} />
              <Route path='puestos/eliminar/:id' element={<div> Eliminar puesto</div>}/>
              {/* Ruta por defecto para admin */}
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
              <Route path="dashboard" element={<InicioPage />} />
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
              <Route path="dashboard" element={<InicioPage />} />
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
              <Route path="dashboard" element={<InicioPage />} />
              <Route path="profile" element={<div>Perfil Cliente</div>} />
              <Route path="" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </ProtectedRoute>
        } 
      />

      {/* Ruta de no autorizado */}
      <Route 
        path="/unauthorized" 
        element={
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>⛔ No Autorizado</h1>
            <p>No tienes permisos para acceder a esta página.</p>
            <p>Tu rol actual: <strong>{user?.role}</strong></p>
            <button 
              onClick={() => window.location.href = getInicioPath()}
              style={{
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                cursor: 'pointer',
                marginTop: '1rem'
              }}
            >
              Ir al Inicio
            </button>
          </div>
        } 
      />

      {/* Ruta por defecto - Redirige según autenticación manteniendo la ruta actual si es posible */}
      <Route 
        path="/" 
        element={
          <Navigate to={getRedirectPath()} replace />
        } 
      />
      
      {/* Ruta 404 - Para cualquier otra ruta no definida */}
      <Route path="*" element={
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>🔍 404 - Página No Encontrada</h1>
          <p>La ruta <strong>{location.pathname}</strong> no existe.</p>
          <div style={{ margin: '1rem 0' }}>
            <p><strong>Usuario:</strong> {user?.username || 'No autenticado'}</p>
            <p><strong>Rol:</strong> {user?.role || 'No asignado'}</p>
            <p><strong>Autenticado:</strong> {isAuthenticated ? 'Sí' : 'No'}</p>
          </div>
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
            {isAuthenticated ? 'Ir al Inicio' : 'Ir al Login'}
          </button>
        </div>
      } />
    </Routes>
  );
};

export default AppRouter;