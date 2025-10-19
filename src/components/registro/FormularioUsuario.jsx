import { useState } from "react";
import { registrarUsuario } from "../../services/userService";
import { FaSave, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./FormularioUsuario.css";

export default function FormularioUsuario() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    login: "",
    correo_electronico: "",
    password: "",
    confirmar_password: "",
    estatus_id: 1,
  });

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (usuario.password !== usuario.confirmar_password) {
      alert("⚠️ Las contraseñas no coinciden");
      return;
    }

    try {
      await registrarUsuario(usuario);
      alert("🎉 Usuario registrado correctamente");
      setUsuario({
        login: "",
        correo_electronico: "",
        password: "",
        confirmar_password: "",
        estatus_id: 1,
      });
    } catch (error) {
      alert(`❌ Error al registrar usuario: ${error.message}`);
    }
  };

  return (
    <div className="form-card">
      <div className="form-head">Registrar Usuario</div>
      <div className="form-content">
        <p className="form-subtitle">Completa los campos para crear un nuevo usuario</p>

        <form onSubmit={handleSubmit} className="form-usuario">
          <div className="input-group">
            <label>Usuario (login)</label>
            <input
              type="text"
              name="login"
              placeholder="Ej: jlopez"
              value={usuario.login}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              name="correo_electronico"
              placeholder="Ej: usuario@empresa.com"
              value={usuario.correo_electronico}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={usuario.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Confirmar contraseña</label>
            <input
              type="password"
              name="confirmar_password"
              placeholder="********"
              value={usuario.confirmar_password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-buttons">
            <button
              type="button"
              className="btn-cancelar"
              onClick={() => navigate(-1)}
            >
              <FaArrowLeft /> Cancelar
            </button>
            <button type="submit" className="btn-guardar">
              <FaSave /> Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
