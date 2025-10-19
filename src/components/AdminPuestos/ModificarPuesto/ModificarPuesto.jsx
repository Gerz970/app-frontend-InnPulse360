// components/AdminPuestos/ModificarPuesto/ModificarPuesto.jsx
import React, { useState, useEffect } from "react";
import { FaTimes, FaSave, FaExclamationTriangle, FaCheckCircle, FaBriefcase } from "react-icons/fa";
import { actualizarPuesto, obtenerPuestoPorId } from "../../../services/puestoService";
import "./ModificarPuesto.css";

export default function ModificarPuesto({ isOpen, onClose, puestoId, onPuestoActualizado }) {
  const [formData, setFormData] = useState({
    puesto: "",
    descripcion: "",
    estatus_id: 1
  });
  
  const [cargando, setCargando] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(false);

  useEffect(() => {
    if (isOpen && puestoId) {
      cargarPuesto();
    }
  }, [isOpen, puestoId]);

  const cargarPuesto = async () => {
    try {
      setCargando(true);
      setError(null);
      const puesto = await obtenerPuestoPorId(puestoId);
      setFormData({
        puesto: puesto.puesto || "",
        descripcion: puesto.descripcion || "",
        estatus_id: puesto.estatus_id || 1
      });
    } catch (error) {
      console.error("Error al cargar puesto:", error);
      setError("No se pudo cargar la información del puesto.");
    } finally {
      setCargando(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpiar errores y mensajes de éxito cuando el usuario escribe
    if (error) setError(null);
    if (exito) setExito(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setEnviando(true);
      setError(null);
      setExito(false);

      // Validaciones
      if (!formData.puesto.trim()) {
        throw new Error("El nombre del puesto es requerido");
      }

      if (formData.puesto.trim().length < 2 ) {
        throw new Error("El nombre del puesto debe tener al menos 2 caracteres");
      }

      if (formData.descripcion && formData.descripcion.length > 250) {
        throw new Error("La descripción no puede tener más de 250 caracteres");
      }

      // Preparar datos para enviar
      const puestoData = {
        puesto: formData.puesto.trim(),
        descripcion: formData.descripcion.trim() || null,
        estatus_id: parseInt(formData.estatus_id)
      };

      await actualizarPuesto(puestoId, puestoData);
      
      // Mostrar mensaje de éxito
      setExito(true);
      
      // Esperar un momento antes de cerrar para que el usuario vea el mensaje
      setTimeout(() => {
        // Notificar al componente padre que se actualizó
        if (onPuestoActualizado) {
          onPuestoActualizado();
        }
        onClose();
      }, 1500);
      
    } catch (error) {
      console.error("Error al actualizar puesto:", error);
      setError(error.message);
    } finally {
      setEnviando(false);
    }
  };

  const handleCancelar = () => {
    setFormData({
      puesto: "",
      descripcion: "",
      estatus_id: 1
    });
    setError(null);
    setExito(false);
    onClose();
  };

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-contenido modificar-puesto-modal">
        <button className="modal-cerrar" onClick={handleCancelar}>
          <FaTimes />
        </button>

        <div className="modal-header">
          <div className="header-icon">
            <FaBriefcase />
          </div>
          <h2>Modificar Puesto</h2>
          <p>Actualiza la información del puesto</p>
        </div>

        {cargando ? (
          <div className="cargando-modal">
            <p>Cargando información del puesto...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="formulario-modal">
            {error && (
              <div className="error-message">
                <FaExclamationTriangle />
                <span>{error}</span>
              </div>
            )}

            {exito && (
              <div className="success-message">
                <FaCheckCircle />
                <span>¡Puesto actualizado correctamente!</span>
              </div>
            )}

            <div className="form-grid">
              {/* Nombre del Puesto */}
              <div className="form-group">
                <label htmlFor="puesto">Nombre del Puesto *</label>
                <input
                  type="text"
                  id="puesto"
                  name="puesto"
                  value={formData.puesto}
                  onChange={handleChange}
                  required
                  disabled={enviando || exito}
                  placeholder="Ej: Recepcionista, Limpieza, Gerente..."
                  maxLength={100}
                />
                <small className="hint">Mínimo 2 caracteres</small>
              </div>

              {/* Estado */}
              <div className="form-group">
                <label htmlFor="estatus_id">Estado *</label>
                <select
                  id="estatus_id"
                  name="estatus_id"
                  value={formData.estatus_id}
                  onChange={handleChange}
                  required
                  disabled={enviando || exito}
                >
                  <option value={1}>Activo</option>
                  <option value={0}>Inactivo</option>
                </select>
                <small className="hint">Los puestos inactivos no estarán disponibles para asignar</small>
              </div>

              {/* Descripción */}
              <div className="form-group full-width">
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  disabled={enviando || exito}
                  placeholder="Describe las responsabilidades y funciones del puesto..."
                  maxLength={500}
                  rows={4}
                />
                <small className="hint">
                  {formData.descripcion.length}/500 caracteres - Opcional
                </small>
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
                disabled={enviando || exito}
              >
                {enviando ? "Actualizando..." : exito ? "¡Actualizado!" : <><FaSave /> Actualizar</>}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}