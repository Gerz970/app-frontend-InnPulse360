import React, { useState, useEffect } from "react";
import { getRolesDisponibles, getRolesUsuario, asignarRolesUsuario } from "../../services/userService";
import { FaSave, FaTimes } from "react-icons/fa";
import "./AsignacionRol.css";

export default function ModalAsignarRoles({ usuarioId, onClose }) {
  const [rolesDB, setRolesDB] = useState([]);
  const [rolesUsuario, setRolesUsuario] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarRoles() {
      try {
        const roles = await getRolesDisponibles();
        setRolesDB(roles);

        const asignados = await getRolesUsuario(usuarioId);
        setRolesUsuario(asignados.map(r => r.id_rol));
      } catch (error) {
        alert("Error al cargar roles: " + error.message);
      } finally {
        setCargando(false);
      }
    }
    cargarRoles();
  }, [usuarioId]);

  const handleChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, opt => parseInt(opt.value));
    setRolesUsuario(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await asignarRolesUsuario(usuarioId, rolesUsuario);
      alert("🎉 Roles asignados correctamente");
      onClose();
    } catch (error) {
      alert("❌ Error al asignar roles: " + error.message);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <h3>Asignar Roles</h3>
        <form onSubmit={handleSubmit}>
          <select multiple value={rolesUsuario} onChange={handleChange}>
            {cargando ? (
              <option disabled>Cargando...</option>
            ) : (
              rolesDB.map(r => (
                <option key={r.id_rol} value={r.id_rol}>{r.rol}</option>
              ))
            )}
          </select>
          <div className="modal-buttons">
            <button type="button" onClick={onClose}><FaTimes /> Cancelar</button>
            <button type="submit"><FaSave /> Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
