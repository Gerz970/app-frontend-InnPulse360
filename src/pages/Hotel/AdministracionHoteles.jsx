// pages/AdministracionHoteles.jsx

import ListaHoteles from "../../components/hotel/ListaHoteles"; // Asegúrate de la ruta correcta
import "./AdministracionHoteles.css"; // CSS para el layout de esta página

export default function AdministracionHoteles() {
  return (
    <div className="admin-page-container">
      <ListaHoteles />
    </div>
  );
}