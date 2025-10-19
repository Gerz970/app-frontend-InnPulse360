import React from 'react';
import ListaEmpleados from '../../../components/AdminEmpleados/ListaEmpleados/ListaEmpleados';
import Navbar from '../../../components/Navbar/Navbar';

export default function GestionEmpleados() {
  return (
    <div className="gestion-empleados-page">
        <Navbar>
              <ListaEmpleados />
        </Navbar>

    </div>
  );
}