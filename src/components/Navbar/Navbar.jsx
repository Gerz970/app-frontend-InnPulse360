import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/images/Logo_basic.png';
import './Navbar.css';

// Componente Modal de Confirmación
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
        </div>
        <div className="modal-body">
          <p className="modal-message">{message}</p>
        </div>
        <div className="modal-footer">
          <button 
            className="modal-btn modal-btn-cancel"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button 
            className="modal-btn modal-btn-confirm"
            onClick={onConfirm}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Módulos disponibles según el rol
  const modules = {
    Administrador: [
      { id: 'dashboard', name: 'Dashboard', icon: '📊', path: '/admin/dashboard' },
      { id: 'reservations', name: 'Reservaciones', icon: '📅', path: '/admin/reservations' },
      { id: 'rooms', name: 'Habitaciones', icon: '🛏️', path: '/admin/rooms' },
      { id: 'clients', name: 'Clientes', icon: '👥', path: '/admin/clients' },
      { id: 'reports', name: 'Reportes', icon: '📈', path: '/admin/reports' },
      { id: 'users', name: 'Usuarios', icon: '👤', path: '/admin/users' },
      { id: 'settings', name: 'Configuración', icon: '⚙️', path: '/admin/settings' }
    ],
    Recepcionista: [
      { id: 'dashboard', name: 'Dashboard', icon: '📊', path: '/empleado/dashboard' },
      { id: 'reservations', name: 'Reservaciones', icon: '📅', path: '/empleado/reservations' },
      { id: 'clients', name: 'Clientes', icon: '👥', path: '/empleado/clients' },
      { id: 'checkin', name: 'Check-In', icon: '🏨', path: '/empleado/checkin' },
      { id: 'checkout', name: 'Check-Out', icon: '🚪', path: '/empleado/checkout' }
    ],
    Gerente: [
      { id: 'dashboard', name: 'Dashboard', icon: '📊', path: '/gerente/dashboard' },
      { id: 'reservations', name: 'Reservaciones', icon: '📅', path: '/gerente/reservations' },
      { id: 'rooms', name: 'Habitaciones', icon: '🛏️', path: '/gerente/rooms' },
      { id: 'reports', name: 'Reportes', icon: '📈', path: '/gerente/reports' },
      { id: 'finance', name: 'Finanzas', icon: '💰', path: '/gerente/finance' }
    ],
    Limpieza: [
      { id: 'dashboard', name: 'Dashboard', icon: '📊', path: '/empleado/dashboard' },
      { id: 'cleaning', name: 'Limpieza', icon: '🧹', path: '/empleado/cleaning' },
      { id: 'inventory', name: 'Inventario', icon: '📦', path: '/empleado/inventory' }
    ],
    Usuario: [
      { id: 'dashboard', name: 'Dashboard', icon: '📊', path: '/cliente/dashboard' },
      { id: 'profile', name: 'Perfil', icon: '👤', path: '/cliente/profile' }
    ]
  };

  const userModules = modules[user?.role] || modules.Usuario;

  const handleModuleClick = (module) => {
    navigate(module.path);
  };

  // Verificar si un módulo está activo
  const isActiveModule = (modulePath) => {
    return location.pathname === modulePath;
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate('/login');
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="app-container">
      {/* Navbar Lateral */}
      <div className={`navbar ${isCollapsed ? 'navbar-collapsed' : ''}`}>
        {/* Header con Logo */}
        <div className="navbar-header">
          <div className="navbar-brand">
            <div className="logo-container">
              <div className="logo-image-container">
                <img src={logo} className="logo-icon" alt="InnPulse360 Logo" />
              </div>
              
            </div>
          </div>
          
          {/* Botón Toggle - Siempre sobresaliendo */}
          <button 
            className="navbar-toggle"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? 'Expandir menú' : 'Contraer menú'}
          >
            {isCollapsed ? '›' : '‹'}
          </button>
        </div>

        {/* Información del usuario */}
        {!isCollapsed && (
          <>
            <div className="user-section">
              <div className="user-avatar">
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="user-info">
                <span className="user-name">{user?.username || 'Usuario'}</span>
                <span className="user-role">{user?.role || 'Rol no asignado'}</span>
              </div>
            </div>
            <div className="navbar-divider"></div>
          </>
        )}

        {/* Módulos de navegación */}
        <nav className="navbar-nav">
          {userModules.map(module => (
            <button
              key={module.id}
              className={`nav-item ${isActiveModule(module.path) ? 'nav-item-active' : ''}`}
              onClick={() => handleModuleClick(module)}
              title={isCollapsed ? module.name : ''}
            >
              <span className="nav-icon">{module.icon}</span>
              {!isCollapsed && (
                <span className="nav-text">{module.name}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Footer con logout */}
        <div className="navbar-footer">
          <button 
            className="logout-btn"
            onClick={handleLogoutClick}
            title={isCollapsed ? 'Cerrar Sesión' : ''}
          >
            <span className="nav-icon">⎋</span>
            {!isCollapsed && (
              <span className="nav-text">Cerrar Sesión</span>
            )}
          </button>
        </div>
      </div>

      {/* Contenido Principal */}
      <main className={`main-content ${isCollapsed ? 'main-content-collapsed' : ''}`}>
        {children}
      </main>

      {/* Modal de Confirmación de Logout */}
      <ConfirmModal
        isOpen={showLogoutModal}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
        title="Cerrar Sesión"
        message="¿Estás seguro de que quieres cerrar sesión?"
      />
    </div>
  );
};

export default Navbar;