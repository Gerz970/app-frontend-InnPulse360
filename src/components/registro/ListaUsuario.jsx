import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrashAlt, FaSearch, FaUserShield } from "react-icons/fa";
import { obtenerUsuarios, eliminarUsuario } from "../../services/userService";
import ModalAsignarRoles from "./AsigancionRol";
import "./ListaUsuario.css";

export default function ListaUsuarios() {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const data = await obtenerUsuarios();
      setUsuarios(data || []);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      alert("No se pudieron cargar los usuarios. Revisa la consola.");
    }
  };

  const usuariosFiltrados = usuarios.filter(
    (user) =>
      user.login?.toLowerCase().includes(busqueda.toLowerCase()) ||
      user.correo_electronico?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleModificar = (userLogin) => {
    navigate(`/admin/modificarUsuario/${userLogin}`);
  };

  const handleEliminar = async (userLogin) => {
    if (window.confirm(`¿Seguro que deseas eliminar al usuario ${userLogin}?`)) {
      try {
        await eliminarUsuario(userLogin);
        setUsuarios((prev) => prev.filter((user) => user.login !== userLogin));
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
        alert("No se pudo eliminar el usuario. Revisa la consola.");
      }
    }
  };

  const handleCrearUsuario = () => {
    navigate("/admin/usersR");
  };

  const handleAsignarRoles = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setModalOpen(true);
  };

  const renderRoles = (roles) => {
    if (!roles || !Array.isArray(roles) || roles.length === 0) {
      return <span className="rol-tag-ninguno">Sin rol</span>;
    }
    return roles.map((r, index) => (
      <span key={index} className="rol-tag">
        {r?.rol || r?.nombre || `Rol #${index + 1}`}
      </span>
    ));
  };

  return (
    <div className="lista-usuarios-container">
      <h1>Administración de Usuarios</h1>

      <div className="acciones-header">
        <button className="btn-primary" onClick={handleCrearUsuario}>
          <FaPlus /> Crear Usuario
        </button>

        <div className="search-bar">
          <FaSearch />
          <input
            type="text"
            placeholder="Buscar por usuario o correo..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      <div className="tabla-responsive">
        <table className="tabla-usuarios">
          <thead>
            <tr>
              <th>Usuario (Login)</th>
              <th>Correo Electrónico</th>
              <th>Roles Asignados</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.length > 0 ? (
              usuariosFiltrados.map((user) => (
                <tr key={user.id_usuario} className="fila-usuario">
                  <td>{user.login}</td>
                  <td>{user.correo_electronico}</td>
                  <td>{renderRoles(user.roles)}</td>
                  <td className="acciones-td">
                    <button
                      className="btn-accion btn-modificar"
                      title="Modificar"
                      onClick={() => handleModificar(user.login)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn-accion btn-eliminar"
                      title="Eliminar"
                      onClick={() => handleEliminar(user.login)}
                    >
                      <FaTrashAlt />
                    </button>
                    <button
                      className="btn-accion btn-roles"
                      title="Asignar Roles"
                      onClick={() => handleAsignarRoles(user)}
                    >
                      <FaUserShield />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-results">
                  No se encontraron usuarios que coincidan con la búsqueda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && usuarioSeleccionado && (
        <ModalAsignarRoles
          usuarioId={usuarioSeleccionado.id_usuario}
          onClose={() => {
            setModalOpen(false);
            cargarUsuarios();
          }}
        />
      )}
    </div>
  );
}
