import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar/Navbar';
import './Inicio.css';

const InicioPage = () => {
  const { user } = useAuth();
  

  // Función para obtener saludo según la hora
  const getSaludo = () => {
    const hora = new Date().getHours();
    if (hora < 12) return '¡Buenos días!';
    if (hora < 18) return '¡Buenas tardes!';
    return '¡Buenas noches!';
  };

  // Información específica por rol
  const getRolInfo = () => {
    switch(user?.role) {
      case 'Administrador':
        return {
          titulo: 'Panel de Control',
          descripcion: 'Tienes acceso completo al sistema de gestión hotelera',
          icono: '🏢',
          color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        };
      case 'Recepcionista':
        return {
          titulo: 'Recepción',
          descripcion: 'Gestiona check-ins, check-outs y atención al cliente',
          icono: '🏨',
          color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        };
      case 'Gerente':
        return {
          titulo: 'Gerencia',
          descripcion: 'Supervisa operaciones y analiza el rendimiento del hotel',
          icono: '💼',
          color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        };
      case 'Limpieza':
        return {
          titulo: 'Limpieza',
          descripcion: 'Controla el estado de limpieza y mantenimiento',
          icono: '🧹',
          color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
        };
      default:
        return {
          titulo: 'Bienvenido',
          descripcion: 'Gracias por usar InnPulse360',
          icono: '👋',
          color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        };
    }
  };

  const rolInfo = getRolInfo();

  return (
    <div className="dashboard-layout">
      <Navbar />
      
        <div className="inicio-container">
          
          {/* Header con saludo */}
          <div className="welcome-header" style={{ background: rolInfo.color }}>
            <div className="welcome-content">
              <div className="welcome-icon">{rolInfo.icono}</div>
              <div className="welcome-text">
                <h1>{getSaludo()}</h1>
                <h2>{user?.username || 'Usuario'}</h2>
                <p>{rolInfo.titulo}</p>
              </div>
            </div>
          </div>

          {/* Tarjetas de información */}
          <div className="info-grid">
            <div className="info-card user-card">
              <div className="card-icon">👤</div>
              <div className="card-content">
                <h3>Tu Perfil</h3>
                <div className="user-details">
                  <p><strong>Usuario:</strong> {user?.username}</p>
                  <p><strong>Email:</strong> {user?.email}</p>
                  <p><strong>Rol:</strong> <span className="role-badge">{user?.role}</span></p>
                  <p><strong>ID:</strong> {user?.id}</p>
                </div>
              </div>
            </div>

            <div className="info-card stats-card">
              <div className="card-icon">📈</div>
              <div className="card-content">
                <h3>Resumen del Día</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-number">12</span>
                    <span className="stat-label">Check-ins</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">8</span>
                    <span className="stat-label">Check-outs</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">85%</span>
                    <span className="stat-label">Ocupación</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="info-card actions-card">
              <div className="card-icon">⚡</div>
              <div className="card-content">
                <h3>Acciones Rápidas</h3>
                <div className="actions-list">
                  <button className="action-btn">Ver Reservas</button>
                  <button className="action-btn">Nuevo Cliente</button>
                  <button className="action-btn">Generar Reporte</button>
                  {user?.role === 'Administrador' && (
                    <button className="action-btn">Gestionar Usuarios</button>
                  )}
                </div>
              </div>
            </div>

            <div className="info-card welcome-card">
              <div className="card-icon">🎯</div>
              <div className="card-content">
                <h3>¿Qué puedes hacer?</h3>
                <p>{rolInfo.descripcion}</p>
                <ul className="features-list">
                  {user?.role === 'Administrador' && (
                    <>
                      <li>Gestionar usuarios y permisos</li>
                      <li>Ver reportes detallados</li>
                      <li>Configurar el sistema</li>
                    </>
                  )}
                  {user?.role === 'Recepcionista' && (
                    <>
                      <li>Registrar check-ins y check-outs</li>
                      <li>Gestionar reservas</li>
                      <li>Atender a clientes</li>
                    </>
                  )}
                  {user?.role === 'Limpieza' && (
                    <>
                      <li>Controlar estado de habitaciones</li>
                      <li>Gestionar inventario</li>
                      <li>Reportar mantenimiento</li>
                    </>
                  )}
                  {user?.role === 'Gerente' && (
                    <>
                      <li>Supervisar operaciones</li>
                      <li>Analizar métricas</li>
                      <li>Gestionar finanzas</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Mensaje de bienvenida */}
          <div className="welcome-message">
            <h3>¡Bienvenido a InnPulse360!</h3>
            <p>
              Estamos comprometidos en brindarte la mejor experiencia en la gestión hotelera. 
              Utiliza el menú lateral para navegar entre las diferentes funcionalidades del sistema.
            </p>
          </div>

        </div>

    </div>
  );
};

export default InicioPage;