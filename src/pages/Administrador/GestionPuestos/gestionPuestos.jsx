// pages/Administrador/GestionPuestos/GestionPuestos.jsx
import React from 'react';
import ListaPuestos from '../../../components/AdminPuestos/ListaPuestos/ListaPuestos';

import Navbar from '../../../components/Navbar/Navbar';

export default function GestionPuestos() {
  return (
    <div className="gestion-puestos-page">
        <Navbar>
                  <ListaPuestos />
        </Navbar>

    </div>
  );
}