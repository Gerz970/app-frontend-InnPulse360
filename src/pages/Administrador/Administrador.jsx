import React from 'react';

const Administrador = () => {
  return (
    <div className="page-content">
      <h1>🏢 Panel de Administración</h1>
      <p>Bienvenido al panel de administración del sistema</p>
      
      <div className="admin-grid">
        <div className="admin-card">
          <h3>Gestión de Usuarios</h3>
          <p>Administra los usuarios del sistema</p>
        </div>
        <div className="admin-card">
          <h3>Configuración del Sistema</h3>
          <p>Configura parámetros generales</p>
        </div>
        <div className="admin-card">
          <h3>Reportes Avanzados</h3>
          <p>Genera reportes detallados</p>
        </div>
      </div>
    </div>
  );
};

export default Administrador;