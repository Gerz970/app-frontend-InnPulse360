import React from 'react';
import { FaExclamationTriangle, FaExclamationCircle, FaTrash, FaTimes } from 'react-icons/fa';
import './EliminarPuesto.css';

const EliminarPuesto = ({ 
  isOpen, 
  onClose, 
  puesto, 
  onConfirm 
}) => {
  if (!isOpen || !puesto) return null;

  const handleConfirmar = () => {
    onConfirm(puesto.id_puesto);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-contenido confirmar-eliminar-modal">
        <div className="confirmar-header">
          <FaExclamationTriangle className="warning-icon" />
          <h2>¿Eliminar Puesto?</h2>
          <p>Esta acción no se puede deshacer. El puesto será eliminado permanentemente.</p>
        </div>

        <div className="puesto-info">
          <div className="info-item">
            <strong>ID del Puesto:</strong> #{puesto.id_puesto}
          </div>
          <div className="info-item">
            <strong>Nombre:</strong> {puesto.puesto}
          </div>
          <div className="info-item">
            <strong>Descripción:</strong> {puesto.descripcion || "Sin descripción"}
          </div>
          <div className="info-item">
            <strong>Estado:</strong> 
            <span className={`estado-tag ${puesto.estatus_id === 1 ? 'activo' : 'inactivo'}`}>
              {puesto.estatus_id === 1 ? 'Activo' : 'Inactivo'}
            </span>
          </div>
        </div>

        <div className="advertencia">
          <FaExclamationCircle className="advertencia-icon" />
          <div>
            <strong>Advertencia:</strong> Al eliminar este puesto, se perderán todos los datos 
            asociados y no podrá ser recuperado. Asegúrese de que esta es la acción que desea realizar.
          </div>
        </div>

        <div className="modal-actions">
          <button 
            className="btn btn-cancelar" 
            onClick={onClose}
          >
            <FaTimes /> Cancelar
          </button>
          <button 
            className="btn btn-eliminar-confirmar" 
            onClick={handleConfirmar}
          >
            <FaTrash /> Eliminar Puesto
          </button>
        </div>
      </div>
    </div>
  );
};

export default EliminarPuesto;