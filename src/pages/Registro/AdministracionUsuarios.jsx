// pages/AdministracionUsuarios.jsx (Nuevo Componente de Página)

import Navbar from "../../components/Navbar/Navbar";
import ListaUsuarios from "../../components/registro/ListaUsuario";
import "./AdministracionUsuarios.css"; // Un archivo CSS simple para el layout de la página

export default function AdministracionUsuarios() {
  return (
    // Un contenedor simple para dar espacio a la lista
    <Navbar>
    <div className="admin-page-container">
      
      {/* Aquí se renderiza el componente de la lista de usuarios */}
      <ListaUsuarios />
      
    </div>
    </Navbar>
  );
}