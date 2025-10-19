// components/AdminEmpleados/ConfirmarEliminar/ConfirmarEliminar.jsx
import React from "react";
import { FaTimes, FaTrashAlt, FaExclamationTriangle } from "react-icons/fa";
import "./EliminarEmpleado.css";

export default function ConfirmarEliminar({ 
  isOpen, 
  onClose, 
  onConfirm, 
  empleado 
}) {
  const handleConfirmar = () => {
    onConfirm(empleado.id_empleado);
  };

  const handleCancelar = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-contenido confirmar-eliminar-modal">
        <button className="modal-cerrar" onClick={handleCancelar}>
          <FaTimes />
        </button>

        <div className="confirmar-header">
          <div className="warning-icon">
            <FaExclamationTriangle />
          </div>
          <h2>Confirmar Eliminación</h2>
          <p>¿Estás seguro de que deseas eliminar este empleado?</p>
        </div>

        <div className="empleado-info">
          <div className="info-item">
            <strong>Nombre:</strong> 
            {empleado?.nombre} {empleado?.apellido_paterno} {empleado?.apellido_materno}
          </div>
          <div className="info-item">
            <strong>Clave:</strong> {empleado?.clave_empleado}
          </div>
          <div className="info-item">
            <strong>RFC:</strong> {empleado?.rfc}
          </div>
        </div>

        <div className="advertencia">
          <FaExclamationTriangle className="advertencia-icon" />
          <span>Esta acción no se puede deshacer. El empleado será eliminado permanentemente.</span>
        </div>

        <div className="modal-actions">
          <button
            type="button"
            onClick={handleCancelar}
            className="btn btn-cancelar"
          >
            <FaTimes /> Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirmar}
            className="btn btn-eliminar-confirmar"
          >
            <FaTrashAlt /> Sí, Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}