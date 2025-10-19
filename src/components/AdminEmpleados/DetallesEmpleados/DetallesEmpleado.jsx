// components/AdminEmpleados/VerDetallesEmpleado/VerDetallesEmpleado.jsx
import React, { useState, useEffect } from "react";
import { FaTimes, FaUser, FaIdCard, FaHome, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { obtenerEmpleadoPorId } from "../../../services/empleadoService";
import "./DetallesEmpleado.css";

export default function VerDetallesEmpleado({ isOpen, onClose, empleadoId }) {
  const [empleado, setEmpleado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && empleadoId) {
      cargarEmpleado();
    }
  }, [isOpen, empleadoId]);

  const cargarEmpleado = async () => {
    try {
      setCargando(true);
      setError(null);
      const empleadoData = await obtenerEmpleadoPorId(empleadoId);
      setEmpleado(empleadoData);
    } catch (error) {
      console.error("Error al cargar empleado:", error);
      setError("No se pudo cargar la información del empleado.");
    } finally {
      setCargando(false);
    }
  };

  const formatFecha = (fecha) => {
    if (!fecha) return "No especificada";
    try {
      return new Date(fecha).toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return fecha;
    }
  };

  const calcularEdad = (fechaNacimiento) => {
    if (!fechaNacimiento) return "N/A";
    try {
      const hoy = new Date();
      const nacimiento = new Date(fechaNacimiento);
      let edad = hoy.getFullYear() - nacimiento.getFullYear();
      const mes = hoy.getMonth() - nacimiento.getMonth();
      
      if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
      }
      
      return `${edad} años`;
    } catch {
      return "N/A";
    }
  };

  const handleCerrar = () => {
    setEmpleado(null);
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-contenido detalles-empleado-modal">
        <button className="modal-cerrar" onClick={handleCerrar}>
          <FaTimes />
        </button>

        <div className="modal-header">
          <div className="header-icon">
            <FaUser />
          </div>
          <h2>Detalles del Empleado</h2>
          <p>Información completa del empleado</p>
        </div>

        {cargando ? (
          <div className="cargando-modal">
            <p>Cargando información del empleado...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <span>{error}</span>
          </div>
        ) : empleado ? (
          <div className="detalles-contenido">
            {/* Información Personal */}
            <section className="detalles-seccion">
              <h3 className="seccion-titulo">
                <FaUser className="seccion-icono" />
                Información Personal
              </h3>
              <div className="detalles-grid">
                <div className="detalle-item">
                  <label>Nombre Completo</label>
                  <p className="detalle-valor destacado">
                    {empleado.nombre} {empleado.apellido_paterno} {empleado.apellido_materno}
                  </p>
                </div>
                <div className="detalle-item">
                  <label>Fecha de Nacimiento</label>
                  <p className="detalle-valor">
                    <FaCalendarAlt className="valor-icono" />
                    {formatFecha(empleado.fecha_nacimiento)}
                  </p>
                  <span className="detalle-extra">({calcularEdad(empleado.fecha_nacimiento)})</span>
                </div>
              </div>
            </section>

            {/* Información Laboral */}
            <section className="detalles-seccion">
              <h3 className="seccion-titulo">
                <FaIdCard className="seccion-icono" />
                Información Laboral
              </h3>
              <div className="detalles-grid">
                <div className="detalle-item">
                  <label>Clave de Empleado</label>
                  <p className="detalle-valor codigo">{empleado.clave_empleado}</p>
                </div>
                <div className="detalle-item">
                  <label>Puesto</label>
                  <p className="detalle-valor">
                    {empleado.puesto || (
                      <span className="sin-dato">No asignado</span>
                    )}
                  </p>
                </div>
                <div className="detalle-item">
                  <label>ID de Empleado</label>
                  <p className="detalle-valor codigo">#{empleado.id_empleado}</p>
                </div>
              </div>
            </section>

            {/* Documentos */}
            <section className="detalles-seccion">
              <h3 className="seccion-titulo">
                <FaIdCard className="seccion-icono" />
                Documentos
              </h3>
              <div className="detalles-grid">
                <div className="detalle-item">
                  <label>RFC</label>
                  <p className="detalle-valor codigo">{empleado.rfc}</p>
                </div>
                <div className="detalle-item">
                  <label>CURP</label>
                  <p className="detalle-valor codigo">{empleado.curp}</p>
                </div>
              </div>
            </section>

            {/* Domicilio */}
            <section className="detalles-seccion">
              <h3 className="seccion-titulo">
                <FaHome className="seccion-icono" />
                Domicilio
              </h3>
              <div className="detalles-grid">
                <div className="detalle-item full-width">
                  <label>Dirección Completa</label>
                  <p className="detalle-valor">
                    <FaMapMarkerAlt className="valor-icono" />
                    {empleado.domicilio?.domicilio_completo}
                  </p>
                </div>
                <div className="detalle-item">
                  <label>Código Postal</label>
                  <p className="detalle-valor codigo">{empleado.domicilio?.codigo_postal}</p>
                </div>
                <div className="detalle-item">
                  <label>ID de Domicilio</label>
                  <p className="detalle-valor codigo">#{empleado.domicilio?.id_domicilio}</p>
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