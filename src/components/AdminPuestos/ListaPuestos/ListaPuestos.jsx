// components/AdminPuestos/ListaPuestos/ListaPuestos.jsx
import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrashAlt, FaSearch, FaBriefcase, FaEye } from "react-icons/fa";
import { obtenerPuestos,eliminarPuesto } from "../../../services/puestoService";
import CrearPuesto from "../CrearPuesto/CrearPuesto";
import VerDetallesPuesto from "../DetallePuesto/DetallePuesto";
import ModificarPuesto from "../ModificarPuesto/ModificarPuesto";
import EliminarPuesto from "../EliminarPuesto/EliminarPuesto";
import "./ListaPuestos.css";

export default function ListaPuestos() {
  const [puestos, setPuestos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [modalCrearAbierto, setModalCrearAbierto] = useState(false);
  const [modalDetallesAbierto, setModalDetallesAbierto] = useState(false);
  const [puestoSeleccionado, setPuestoSeleccionado] = useState(null);
  const [modalModificarAbierto, setModalModificarAbierto] = useState(false);
  const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);

  useEffect(() => {
    cargarPuestos();
  }, []);

  const cargarPuestos = async () => {
    try {
      setCargando(true);
      setError(null);
      const data = await obtenerPuestos(0, 100);
      setPuestos(data || []);
    } catch (error) {
      console.error("Error al obtener puestos:", error);
      setError("No se pudieron cargar los puestos. Por favor, intenta nuevamente.");
    } finally {
      setCargando(false);
    }
  };

  const puestosFiltrados = puestos.filter(
    (puesto) =>
      puesto.puesto?.toLowerCase().includes(busqueda.toLowerCase()) ||
      puesto.descripcion?.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Función para abrir el modal de crear puesto
  const handleCrearPuesto = () => {
    setModalCrearAbierto(true);
  };

  // Función para cerrar el modal de crear
  const handleCerrarModalCrear = () => {
    setModalCrearAbierto(false);
  };

  // Función que se ejecuta después de crear exitosamente
  const handlePuestoCreado = () => {
    cargarPuestos();
  };

  // NUEVO: Función para abrir modal de modificar
  const handleModificar = (puesto) => {
    setPuestoSeleccionado(puesto);
    setModalModificarAbierto(true);
  };

  // NUEVO: Función para cerrar modal de modificar
  const handleCerrarModalModificar = () => {
    setModalModificarAbierto(false);
    setPuestoSeleccionado(null);
  };

  const handleEliminar = (puesto) => {
  setPuestoSeleccionado(puesto);
  setModalEliminarAbierto(true);
 };
const handleConfirmarEliminar = async (puestoId) => {
  try {
    await eliminarPuesto(puestoId); // Tu función del servicio
    await cargarPuestos(); // Recargar la lista
    setModalEliminarAbierto(false);
    setPuestoSeleccionado(null);
    // Puedes agregar un mensaje de éxito aquí si quieres
  } catch (error) {
    console.error("Error al eliminar puesto:", error);
    setError("Error al eliminar el puesto. Por favor, intenta nuevamente.");
  }
};

  // NUEVO: Función que se ejecuta después de modificar exitosamente
  const handlePuestoActualizado = () => {
    cargarPuestos();
    handleCerrarModalModificar();
  };

  const handleVerDetalles = (puesto) => {
    setPuestoSeleccionado(puesto);
    setModalDetallesAbierto(true);
  };

  const handleCerrarModalDetalles = () => {
    setModalDetallesAbierto(false);
    setPuestoSeleccionado(null);
  };

  // Función para mostrar el estado basado en estatus_id
  const renderEstatus = (estatusId) => {
    switch(estatusId) {
      case 1:
        return { texto: "Activo", clase: "activo" };
      case 0:
        return { texto: "Inactivo", clase: "inactivo" };
      default:
        return { texto: "Desconocido", clase: "desconocido" };
    }
  };

  if (cargando) {
    return (
      <div className="lista-puestos-container">
        <div className="cargando">
          <p>Cargando puestos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lista-puestos-container">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={cargarPuestos} className="btn-primary">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="lista-puestos-container">
      <h1>
        <FaBriefcase className="titulo-icono" />
        Gestión de Puestos
      </h1>

      <div className="acciones-header">
        <button className="btn-primary" onClick={handleCrearPuesto}>
          <FaPlus /> Crear Puesto
        </button>

        <div className="search-bar">
          <FaSearch />
          <input
            type="text"
            placeholder="Buscar por nombre o descripción..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      <div className="info-puestos">
        <div className="contador-puestos">
          <span className="numero">{puestos.length}</span>
          <span className="texto">puestos registrados</span>
        </div>
      </div>

      <div className="tabla-responsive">
        <table className="tabla-puestos">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre del Puesto</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {puestosFiltrados.length > 0 ? (
              puestosFiltrados.map((puesto) => {
                const estatus = renderEstatus(puesto.estatus_id);
                return (
                  <tr key={puesto.id_puesto} className="fila-puesto">
                    <td className="id-cell">
                      <span className="id-badge">#{puesto.id_puesto}</span>
                    </td>
                    <td>
                      <strong className="nombre-puesto">{puesto.puesto}</strong>
                    </td>
                    <td className="descripcion-cell">
                      {puesto.descripcion || "Sin descripción"}
                    </td>
                    <td>
                      <span className={`estado-tag ${estatus.clase}`}>
                        {estatus.texto}
                      </span>
                    </td>
                    <td className="acciones-td">
                      <button
                        className="btn-accion btn-detalles"
                        title="Ver Detalles"
                        onClick={() => handleVerDetalles(puesto)}
                      >
                        <FaEye />
                      </button>
                      <button
                        className="btn-accion btn-modificar"
                        title="Modificar"
                        onClick={() => handleModificar(puesto)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn-accion btn-eliminar"
                        title="Eliminar"
                        onClick={() => handleEliminar(puesto)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="no-results">
                  {busqueda ? 
                    "No se encontraron puestos que coincidan con la búsqueda." : 
                    "No hay puestos registrados."
                  }
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de Crear Puesto */}
      {modalCrearAbierto && (
        <CrearPuesto
          isOpen={modalCrearAbierto}
          onClose={handleCerrarModalCrear}
          onPuestoCreado={handlePuestoCreado}
        />
      )}

      {/* Modal de Ver Detalles */}
      {modalDetallesAbierto && puestoSeleccionado && (
        <VerDetallesPuesto
          isOpen={modalDetallesAbierto}
          onClose={handleCerrarModalDetalles}
          puestoId={puestoSeleccionado.id_puesto}
        />
      )}

      {/* NUEVO: Modal de Modificar Puesto */}
      {modalModificarAbierto && puestoSeleccionado && (
        <ModificarPuesto
          isOpen={modalModificarAbierto}
          onClose={handleCerrarModalModificar}
          puestoId={puestoSeleccionado.id_puesto}
          onPuestoActualizado={handlePuestoActualizado}
        />
      )}
      {/* Modal para Eliminar */}
      {modalEliminarAbierto && puestoSeleccionado && (
  <EliminarPuesto
    isOpen={modalEliminarAbierto}
    onClose={() => setModalEliminarAbierto(false)}
    puesto={puestoSeleccionado}
    onConfirm={handleConfirmarEliminar}
  />
)}
    </div>
  );
}