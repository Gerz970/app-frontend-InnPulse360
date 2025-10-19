// components/AdminEmpleados/CrearEmpleado/CrearEmpleado.jsx
import React, { useState } from "react";
import { FaTimes, FaSave, FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";
import { crearEmpleado } from "../../../services/empleadoService";
import "./CrearEmpleado.css";

export default function CrearEmpleado({ isOpen, onClose, onEmpleadoCreado }) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    clave_empleado: "",
    curp: "",
    rfc: "",
    fecha_nacimiento: "",
    domicilio_completo: "",
    codigo_postal: ""
  });
  
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(false);

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
      if (formData.curp.length !== 18) {
        throw new Error("El CURP debe tener exactamente 18 caracteres");
      }

      if (formData.rfc.length < 12 || formData.rfc.length > 13) {
        throw new Error("El RFC debe tener entre 12 y 13 caracteres");
      }

      if (!formData.fecha_nacimiento) {
        throw new Error("La fecha de nacimiento es requerida");
      }

      // Validar longitud del domicilio (máximo 80 caracteres)
      if (formData.domicilio_completo.length > 80) {
        throw new Error("El domicilio no puede tener más de 80 caracteres");
      }

      // Validar código postal (5 dígitos)
      if (!/^\d{5}$/.test(formData.codigo_postal)) {
        throw new Error("El código postal debe tener exactamente 5 dígitos");
      }

      // Preparar datos para enviar (estructura que espera la API)
      const empleadoData = {
        nombre: formData.nombre.trim(),
        apellido_paterno: formData.apellido_paterno.trim(),
        apellido_materno: formData.apellido_materno.trim(),
        clave_empleado: formData.clave_empleado.trim(),
        curp: formData.curp.trim(),
        rfc: formData.rfc.trim(),
        fecha_nacimiento: formData.fecha_nacimiento,
        domicilio: {
          domicilio_completo: formData.domicilio_completo.trim(),
          codigo_postal: formData.codigo_postal.trim()
        }
      };

      await crearEmpleado(empleadoData);
      
      // Mostrar mensaje de éxito
      setExito(true);
      
      // Esperar un momento antes de cerrar para que el usuario vea el mensaje
      setTimeout(() => {
        // Notificar al componente padre que se creó un empleado
        if (onEmpleadoCreado) {
          onEmpleadoCreado();
        }
        handleCancelar();
      }, 1500);
      
    } catch (error) {
      console.error("Error al crear empleado:", error);
      setError(error.message);
    } finally {
      setEnviando(false);
    }
  };

  const handleCancelar = () => {
    // Resetear formulario
    setFormData({
      nombre: "",
      apellido_paterno: "",
      apellido_materno: "",
      clave_empleado: "",
      curp: "",
      rfc: "",
      fecha_nacimiento: "",
      domicilio_completo: "",
      codigo_postal: ""
    });
    setError(null);
    setExito(false);
    onClose();
  };

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-contenido crear-empleado-modal">
        <button className="modal-cerrar" onClick={handleCancelar}>
          <FaTimes />
        </button>

        <div className="modal-header">
          <h2>Crear Nuevo Empleado</h2>
          <p>Completa la información del nuevo empleado</p>
        </div>

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
              <span>¡Empleado creado correctamente!</span>
            </div>
          )}

          <div className="form-grid">
            {/* Información Personal */}
            <div className="form-group">
              <label htmlFor="nombre">Nombre *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                disabled={enviando || exito}
                placeholder="Ej: María"
                maxLength={50}
              />
            </div>

            <div className="form-group">
              <label htmlFor="apellido_paterno">Apellido Paterno *</label>
              <input
                type="text"
                id="apellido_paterno"
                name="apellido_paterno"
                value={formData.apellido_paterno}
                onChange={handleChange}
                required
                disabled={enviando || exito}
                placeholder="Ej: Pérez"
                maxLength={50}
              />
            </div>

            <div className="form-group">
              <label htmlFor="apellido_materno">Apellido Materno *</label>
              <input
                type="text"
                id="apellido_materno"
                name="apellido_materno"
                value={formData.apellido_materno}
                onChange={handleChange}
                required
                disabled={enviando || exito}
                placeholder="Ej: López"
                maxLength={50}
              />
            </div>

            <div className="form-group">
              <label htmlFor="fecha_nacimiento">Fecha de Nacimiento *</label>
              <input
                type="date"
                id="fecha_nacimiento"
                name="fecha_nacimiento"
                value={formData.fecha_nacimiento}
                onChange={handleChange}
                required
                disabled={enviando || exito}
              />
            </div>

            {/* Información Laboral */}
            <div className="form-group">
              <label htmlFor="clave_empleado">Clave de Empleado *</label>
              <input
                type="text"
                id="clave_empleado"
                name="clave_empleado"
                value={formData.clave_empleado}
                onChange={handleChange}
                required
                disabled={enviando || exito}
                placeholder="Ej: 001"
                maxLength={20}
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
                disabled={enviando || exito}
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
                disabled={enviando || exito}
                maxLength={18}
                minLength={18}
                placeholder="MABG851202HZTWMG91"
              />
              <small className="hint">18 caracteres exactos</small>
            </div>

            {/* Domicilio */}
            <div className="form-group full-width">
              <label htmlFor="domicilio_completo">Domicilio Completo *</label>
              <input
                type="text"
                id="domicilio_completo"
                name="domicilio_completo"
                value={formData.domicilio_completo}
                onChange={handleChange}
                required
                disabled={enviando || exito}
                maxLength={80}
                placeholder="Calle Los Olivos #123, Col. Centro, CDMX"
              />
              <small className="hint">
                Máximo 80 caracteres. Caracteres usados: {formData.domicilio_completo.length}/80
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="codigo_postal">Código Postal *</label>
              <input
                type="text"
                id="codigo_postal"
                name="codigo_postal"
                value={formData.codigo_postal}
                onChange={handleChange}
                required
                disabled={enviando || exito}
                maxLength={5}
                minLength={5}
                pattern="[0-9]{5}"
                placeholder="06000"
              />
              <small className="hint">5 dígitos exactos</small>
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
              className="btn btn-crear"
              disabled={enviando || exito}
            >
              {enviando ? "Creando..." : exito ? "¡Creado!" : <><FaSave /> Crear Empleado</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}