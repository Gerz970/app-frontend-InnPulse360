// components/AdminPuestos/VerDetallesPuesto/VerDetallesPuesto.jsx
import React, { useState, useEffect } from "react";
import { FaTimes, FaBriefcase, FaInfoCircle, FaCalendarAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { obtenerPuestoPorId } from "../../../services/puestoService";
import "./DetallePuesto.css";

export default function VerDetallesPuesto({ isOpen, onClose, puestoId }) {
  const [puesto, setPuesto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && puestoId) {
      cargarPuesto();
    }
  }, [isOpen, puestoId]);

  const cargarPuesto = async () => {
    try {
      setCargando(true);
      setError(null);
      const puestoData = await obtenerPuestoPorId(puestoId);
      setPuesto(puestoData);
    } catch (error) {
      console.error("Error al cargar puesto:", error);
      setError("No se pudo cargar la información del puesto.");
    } finally {
      setCargando(false);
    }
  };

  // Función para mostrar el estado basado en estatus_id
  const renderEstatus = (estatusId) => {
    switch(estatusId) {
      case 1:
        return { 
          texto: "Activo", 
          clase: "activo",
          icono: <FaCheckCircle className="estatus-icono" />
        };
      case 0:
        return { 
          texto: "Inactivo", 
          clase: "inactivo",
          icono: <FaTimesCircle className="estatus-icono" />
        };
      default:
        return { 
          texto: "Desconocido", 
          clase: "desconocido",
          icono: <FaInfoCircle className="estatus-icono" />
        };
    }
  };

  const handleCerrar = () => {
    setPuesto(null);
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-contenido detalles-puesto-modal">
        <button className="modal-cerrar" onClick={handleCerrar}>
          <FaTimes />
        </button>

        <div className="modal-header">
          <div className="header-icon">
            <FaBriefcase />
          </div>
          <h2>Detalles del Puesto</h2>
          <p>Información completa del puesto</p>
        </div>

        {cargando ? (
          <div className="cargando-modal">
            <p>Cargando información del puesto...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <span>{error}</span>
          </div>
        ) : puesto ? (
          <div className="detalles-contenido">
            {/* Información Básica */}
            <section className="detalles-seccion">
              <h3 className="seccion-titulo">
                <FaBriefcase className="seccion-icono" />
                Información Básica
              </h3>
              <div className="detalles-grid">
                <div className="detalle-item">
                  <label>ID del Puesto</label>
                  <p className="detalle-valor codigo">#{puesto.id_puesto}</p>
                </div>
                <div className="detalle-item">
                  <label>Estado</label>
                  <div className="estado-container">
                    {(() => {
                      const estatus = renderEstatus(puesto.estatus_id);
                      return (
                        <>
                          {estatus.icono}
                          <span className={`estado-tag ${estatus.clase}`}>
                            {estatus.texto}
                          </span>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </section>

            {/* Información del Puesto */}
            <section className="detalles-seccion">
              <h3 className="seccion-titulo">
                <FaInfoCircle className="seccion-icono" />
                Información del Puesto
              </h3>
              <div className="detalles-grid">
                <div className="detalle-item full-width">
                  <label>Nombre del Puesto</label>
                  <p className="detalle-valor destacado">{puesto.puesto}</p>
                </div>
                <div className="detalle-item full-width">
                  <label>Descripción</label>
                  <div className="descripcion-detalle">
                    {puesto.descripcion ? (
                      <p className="detalle-valor">{puesto.descripcion}</p>
                    ) : (
                      <p className="sin-dato">Sin descripción</p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Información del Estado */}
            <section className="detalles-seccion">
              <h3 className="seccion-titulo">
                <FaCalendarAlt className="seccion-icono" />
                Información del Estado
              </h3>
              <div className="detalles-grid">
                <div className="detalle-item">
                  <label>Código de Estado</label>
                  <p className="detalle-valor codigo">{puesto.estatus_id}</p>
                </div>
                <div className="detalle-item">
                  <label>Significado</label>
                  <p className="detalle-valor">
                    {puesto.estatus_id === 1 
                      ? "Puesto activo y disponible para asignar" 
                      : puesto.estatus_id === 0 
                      ? "Puesto inactivo, no disponible" 
                      : "Estado no definido"
                    }
                  </p>
                </div>
              </div>
            </section>
          </div>
        ) : null}

        <div className="modal-actions">
          <button
            type="button"
            onClick={handleCerrar}
            className="btn btn-cerrar"
          >
            <FaTimes /> Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}