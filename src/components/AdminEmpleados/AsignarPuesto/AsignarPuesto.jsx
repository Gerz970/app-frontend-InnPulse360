// components/AsignarPuesto.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FaSave, FaTimes, FaUserTag } from "react-icons/fa";
import { obtenerEmpleadoPorId, actualizarEmpleado } from "../../services/empleadoService";
import "./AsignarPuesto.css";

export default function AsignarPuesto() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  
  const [puesto, setPuesto] = useState("");
  const [empleado, setEmpleado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(null);

  const nombreEmpleado = location.state?.nombreEmpleado || "";

  useEffect(() => {
    cargarEmpleado();
  }, [id]);

  const cargarEmpleado = async () => {
    try {
      setCargando(true);
      const empleadoData = await obtenerEmpleadoPorId(id);
      setEmpleado(empleadoData);
      setPuesto(empleadoData.puesto || "");
    } catch (error) {
      console.error("Error al cargar empleado:", error);
      setError("No se pudo cargar la información del empleado.");
    } finally {
      setCargando(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setEnviando(true);
      setError(null);

      await actualizarEmpleado(id, { puesto });
      
      alert("Puesto asignado correctamente");
      navigate("/admin/empleados");
      
    } catch (error) {
      console.error("Error al asignar puesto:", error);
      setError("No se pudo asignar el puesto. Por favor, intenta nuevamente.");
    } finally {
      setEnviando(false);
    }
  };

  const handleCancelar = () => {
    navigate("/admin/empleados");
  };

  if (cargando) {
    return (
      <div className="asignar-puesto-container">
        <div className="cargando">
          <p>Cargando información...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="asignar-puesto-container">
      <div className="asignar-puesto-header">
        <FaUserTag className="header-icon" />
        <h1>Asignar Puesto</h1>
        <p>Empleado: {nombreEmpleado || `${empleado?.nombre} ${empleado?.apellido_paterno}`}</p>
      </div>

      <form onSubmit={handleSubmit} className="asignar-puesto-form">
        {error && (
          <div className="error-message">
            <span>{error}</span>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="puesto">Puesto *</label>
          <input
            type="text"
            id="puesto"
            value={puesto}
            onChange={(e) => setPuesto(e.target.value)}
            required
            disabled={enviando}
            placeholder="Ej: Desarrollador Frontend, Gerente de Proyectos, etc."
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={handleCancelar}
            className="btn btn-secondary"
            disabled={enviando}
          >
            <FaTimes /> Cancelar
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={enviando}
          >
            {enviando ? "Asignando..." : <><FaSave /> Asignar Puesto</>}
          </button>
        </div>
      </form>
    </div>
  );
}