import FormularioUsuario from "../../components/registro/FormularioUsuario";
import { FaUserPlus } from "react-icons/fa"; 
import "./RegistroUsuario.css";
import Navbar from "../../components/Navbar/Navbar";

export default function RegistroUsuario() {
  return (
    <Navbar>
      <div className="registro-page">
        <div className="registro-form-container">
          <div className="registro-header">
            <FaUserPlus className="registro-icon" />
            <h2>Registrar Usuario</h2>
          </div>
          <p className="registro-subtitulo">
            Registra un nuevo usuario para el sistema del hotel
          </p>
          <FormularioUsuario />
        </div>
      </div>
    </Navbar>
  );
}
