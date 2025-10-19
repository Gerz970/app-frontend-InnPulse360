// components/ModificarEmpleado.jsx
import React, { useState, useEffect } from "react";
import { FaTimes, FaSave, FaExclamationTriangle } from "react-icons/fa";
import { actualizarEmpleado, obtenerEmpleadoPorId } from "../../../services/empleadoService";
import "./ModificarEmpleado.css";

export default function ModificarEmpleado({ isOpen, onClose, empleadoId, onEmpleadoActualizado }) {
  const [formData, setFormData] = useState({
    clave_empleado: "",
    curp: "",
    nombre: "",
    rfc: ""
  });
  
  const [cargando, setCargando] = useState(false);
  const [enviando, setEnviando] = useState(false);
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
      const empleado = await obtenerEmpleadoPorId(empleadoId);
      setFormData({
        clave_empleado: empleado.clave_empleado || "",
        curp: empleado.curp || "",
        nombre: empleado.nombre || "",
        rfc: empleado.rfc || ""
      });
    } catch (error) {
      console.error("Error al cargar empleado:", error);
      setError("No se pudo cargar la información del empleado.");
    } finally {
      setCargando(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Convertir a mayúsculas para CURP y RFC
    if (name === 'curp' || name === 'rfc') {
      setFormData({
        ...formData,
        [name]: value.toUpperCase()
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Limpiar error cuando el usuario escribe
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setEnviando(true);
      setError(null);

      // Validación de CURP
      if (formData.curp.length !== 18) {
        throw new Error("El CURP debe tener exactamente 18 caracteres");
      }

      // Validación de RFC
      if (formData.rfc.length < 12 || formData.rfc.length > 13) {
        throw new Error("El RFC debe tener entre 12 y 13 caracteres");
      }

      await actualizarEmpleado(empleadoId, formData);
      
      // Notificar al componente padre que se actualizó
      if (onEmpleadoActualizado) {
        onEmpleadoActualizado();
      }
      
      alert("Empleado actualizado correctamente");
      onClose();
      
    } catch (error) {
      console.error("Error al actualizar empleado:", error);
      setError(error.message);
    } finally {
      setEnviando(false);
    }
  };

  const handleCancelar = () => {
    setFormData({
      clave_empleado: "",
      curp: "",
      nombre: "",
      rfc: ""
    });
    setError(null);
    onClose();
  };

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <button className="modal-cerrar" onClick={handleCancelar}>
          <FaTimes />
        </button>

        <div className="modal-header">
          <h2>Modificar Empleado</h2>
          <p>Actualiza la información del empleado</p>
        </div>

        {cargando ? (
          <div className="cargando-modal">
            <p>Cargando información del empleado...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="formulario-modal">
            {error && (
              <div className="error-message">
                <FaExclamationTriangle />
                <span>{error}</span>
              </div>
            )}

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="clave_empleado">Clave de Empleado *</label>
                <input
                  type="text"
                  id="clave_empleado"
                  name="clave_empleado"
                  value={formData.clave_empleado}
                  onChange={handleChange}
                  required
                  disabled={enviando}
                />
              </div>

              <div className="form-group">
                <label htmlFor="nombre">Nombre Completo *</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  disabled={enviando}
                />
              </div>

              <div className="form-group">
                <label htmlFor="rfc">RFC *</label>
                <input
                  type="text"
                  id="rfc"
                  name="rfc"
                  value={formData.rfc}
                  onChange={handleChange}
                  required
                  disabled={enviando}
                  maxLength={13}
                  placeholder="MOGF780404S36"
                />
                <small className="hint">12-13 caracteres</small>
              </div>

              <div className="form-group">
                <label htmlFor="curp">CURP *</label>
                <input
                  type="text"
                  id="curp"
                  name="curp"
                  value={formData.curp}
                  onChange={handleChange}
                  required
                  disabled={enviando}
                  maxLength={18}
                  minLength={18}
                  placeholder="MABG851202HZTWMG94"
                />
                <small className="hint">18 caracteres exactos</small>
              </div>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                onClick={handleCancelar}
                className="btn btn-cancelar"
                disabled={enviando}
              >
                <FaTimes /> Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-actualizar"
                disabled={enviando}
              >
                {enviando ? "Actualizando..." : <><FaSave /> Actualizar</>}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}