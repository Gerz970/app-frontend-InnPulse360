import React from 'react';

const Clientes = () => {
  return (
    <div className="page-content">
      <h1>👥 Gestión de Clientes</h1>
      <p>Administra la información de los clientes del hotel</p>
      
      <div className="clients-list">
        <div className="client-card">
          <h4>Juan Pérez</h4>
          <p>Email: juan@email.com</p>
          <p>Teléfono: 123-456-7890</p>
        </div>
        <div className="client-card">
          <h4>María García</h4>
          <p>Email: maria@email.com</p>
          <p>Teléfono: 098-765-4321</p>
        </div>
      </div>
    </div>
  );
};

export default Clientes;