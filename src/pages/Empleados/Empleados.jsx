import React from 'react';

const Empleados = () => {
  return (
    <div className="page-content">
      <h1>👨‍💼 Gestión de Empleados</h1>
      <p>Administra la información del personal del hotel</p>
      
      <div className="employees-grid">
        <div className="employee-card">
          <h4>Recepcionistas</h4>
          <p>Gestión del equipo de recepción</p>
        </div>
        <div className="employee-card">
          <h4>Limpieza</h4>
          <p>Gestión del equipo de limpieza</p>
        </div>
        <div className="employee-card">
          <h4>Gerentes</h4>
          <p>Gestión del equipo gerencial</p>
        </div>
      </div>
    </div>
  );
};

export default Empleados;