// components/ListaEmpleados.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaUserCog, FaEdit, FaTrashAlt, FaSearch, FaUserTie, FaEye } from "react-icons/fa";
import { obtenerEmpleados, eliminarEmpleado } from "../../../services/empleadoService";
import ModificarEmpleado from "../../AdminEmpleados/ModificarEmpleado/ModificarEmpleado"; 
import CrearEmpleado from "../../AdminEmpleados/CrearEmpleado/CrearEmpleado";
import ConfirmarEliminar from "../../AdminEmpleados/EliminarEmpleado/EliminarEmpleado";
import VerDetallesEmpleado from "../../AdminEmpleados/DetallesEmpleados/DetallesEmpleado";
import "./ListaEmpleados.css";

export default function ListaEmpleados() {
  const navigate = useNavigate();
  const [empleados, setEmpleados] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  // Estados para los modales
  const [modalModificarAbierto, setModalModificarAbierto] = useState(false);
  const [modalCrearAbierto, setModalCrearAbierto] = useState(false);
  const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);
  const [modalDetallesAbierto, setModalDetallesAbierto] = useState(false);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    try {
      setCargando(true);
      setError(null);
      const data = await obtenerEmpleados(0, 100);
      setEmpleados(data || []);
    } catch (error) {
      console.error("Error al obtener empleados:", error);
      setError("No se pudieron cargar los empleados. Por favor, intenta nuevamente.");
    } finally {
      setCargando(false);
    }
  };

  const empleadosFiltrados = empleados.filter(
    (empleado) =>
      empleado.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      empleado.apellido_paterno?.toLowerCase().includes(busqueda.toLowerCase()) ||
      empleado.apellido_materno?.toLowerCase().includes(busqueda.toLowerCase()) ||
      empleado.clave_empleado?.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Función para abrir el modal de crear empleado
  const handleCrearEmpleado = () => {
    setModalCrearAbierto(true);
  };

  // Función para cerrar el modal de crear
  const handleCerrarModalCrear = () => {
    setModalCrearAbierto(false);
  };

  // Función que se ejecuta después de crear exitosamente
  const handleEmpleadoCreado = () => {
    cargarEmpleados();
  };

  const handleAsignarPuesto = (idEmpleado, nombreCompleto) => {
    navigate(`/admin/empleados/asignar-puesto/${idEmpleado}`, {
      state: { nombreEmpleado: nombreCompleto }
    });
  };

  // Función para abrir el modal de modificar
  const handleModificar = (empleado) => {
    setEmpleadoSeleccionado(empleado);
    setModalModificarAbierto(true);
  };

  // Función para cerrar el modal de modificar
  const handleCerrarModalModificar = () => {
    setModalModificarAbierto(false);
    setEmpleadoSeleccionado(null);
  };

  // Función que se ejecuta después de actualizar exitosamente
  const handleEmpleadoActualizado = () => {
    cargarEmpleados();
  };

  // Función para abrir el modal de eliminar
  const handleEliminar = (empleado) => {
    setEmpleadoSeleccionado(empleado);
    setModalEliminarAbierto(true);
  };

  // Función para cerrar el modal de eliminar
  const handleCerrarModalEliminar = () => {
    setModalEliminarAbierto(false);
    setEmpleadoSeleccionado(null);
  };

  // Función para confirmar la eliminación
  const handleConfirmarEliminar = async (idEmpleado) => {
    try {
      await eliminarEmpleado(idEmpleado);
      
      // Recargar la lista
      cargarEmpleados();
      
      // Cerrar el modal
      handleCerrarModalEliminar();
      
    } catch (error) {
      console.error("Error al eliminar empleado:", error);
    }
  };

  // Función para abrir el modal de detalles
  const handleVerDetalles = (empleado) => {
    setEmpleadoSeleccionado(empleado);
    setModalDetallesAbierto(true);
  };

  // Función para cerrar el modal de detalles
  const handleCerrarModalDetalles = () => {
    setModalDetallesAbierto(false);
    setEmpleadoSeleccionado(null);
  };

  const formatFecha = (fecha) => {
    if (!fecha) return "N/A";
    try {
      return new Date(fecha).toLocaleDateString('es-MX');
    } catch {
      return fecha;
    }
  };

  const renderPuesto = (puesto) => {
    if (!puesto) {
      return <span className="puesto-tag-ninguno">Sin puesto</span>;
    }
    return <span className="puesto-tag">{puesto}</span>;
  };

  if (cargando) {
    return (
      <div className="lista-empleados-container">
        <div className="cargando">
          <p>Cargando empleados...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lista-empleados-container">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={cargarEmpleados} className="btn-primary">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="lista-empleados-container">
      <h1>Administración de Empleados</h1>

      <div className="acciones-header">
        <button className="btn-primary" onClick={handleCrearEmpleado}>
          <FaPlus /> Crear Empleado
        </button>

        <div className="search-bar">
          <FaSearch />
          <input
            type="text"
            placeholder="Buscar por nombre, apellido o clave..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      <div className="tabla-responsive">
        <table className="tabla-empleados">
          <thead>
            <tr>
              <th>Clave</th>
              <th>Nombre Completo</th>
              <th>RFC</th>
              <th>CURP</th>
              <th>Fecha Nacimiento</th>
              <th>Puesto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleadosFiltrados.length > 0 ? (
              empleadosFiltrados.map((empleado) => (
                <tr key={empleado.id_empleado} className="fila-empleado">
                  <td>{empleado.clave_empleado || "N/A"}</td>
                  <td>
                    {empleado.nombre || ""} {empleado.apellido_paterno || ""} {empleado.apellido_materno || ""}
                  </td>
                  <td>{empleado.rfc || "N/A"}</td>
                  <td>{empleado.curp || "N/A"}</td>
                  <td>{formatFecha(empleado.fecha_nacimiento)}</td>
                  <td>{renderPuesto(empleado.puesto)}</td>
                  <td className="acciones-td">
                    {/* Botón Modificar */}
                    <button
                      className="btn-accion btn-modificar"
                      title="Modificar"
                      onClick={() => handleModificar(empleado)}
                    >
                      <FaEdit />
                    </button>
                    
                    {/* Botón Asignar Puesto */}
                    <button
                      className="btn-accion btn-asignar"
                      title="Asignar Puesto"
                      onClick={() => handleAsignarPuesto(
                        empleado.id_empleado, 
                        `${empleado.nombre} ${empleado.apellido_paterno}`
                      )}
                    >
                      <FaUserCog />
                    </button>
                    
                    {/* Botón Ver Detalles - Ahora abre el modal */}
                    <button
                      className="btn-accion btn-detalles"
                      title="Ver Detalles"
                      onClick={() => handleVerDetalles(empleado)}
                    >
                      <FaEye />
                    </button>
                    
                    {/* Botón Eliminar */}
                    <button
                      className="btn-accion btn-eliminar"
                      title="Eliminar"
                      onClick={() => handleEliminar(empleado)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-results">
                  {busqueda ? 
                    "No se encontraron empleados que coincidan con la búsqueda." : 
                    "No hay empleados registrados."
                  }
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de Modificar Empleado */}
      {modalModificarAbierto && empleadoSeleccionado && (
        <ModificarEmpleado
          isOpen={modalModificarAbierto}
          onClose={handleCerrarModalModificar}
          empleadoId={empleadoSeleccionado.id_empleado}
          onEmpleadoActualizado={handleEmpleadoActualizado}
        />
      )}

      {/* Modal de Crear Empleado */}
      {modalCrearAbierto && (
        <CrearEmpleado
          isOpen={modalCrearAbierto}
          onClose={handleCerrarModalCrear}
          onEmpleadoCreado={handleEmpleadoCreado}
        />
      )}

      {/* Modal de Confirmar Eliminación */}
      {modalEliminarAbierto && empleadoSeleccionado && (
        <ConfirmarEliminar
          isOpen={modalEliminarAbierto}
          onClose={handleCerrarModalEliminar}
          onConfirm={handleConfirmarEliminar}
          empleado={empleadoSeleccionado}
        />
      )}

      {/* Modal de Ver Detalles */}
      {modalDetallesAbierto && empleadoSeleccionado && (
        <VerDetallesEmpleado
          isOpen={modalDetallesAbierto}
          onClose={handleCerrarModalDetalles}
          empleadoId={empleadoSeleccionado.id_empleado}
        />
      )}
    </div>
  );
}