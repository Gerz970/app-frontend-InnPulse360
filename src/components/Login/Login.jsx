import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Modal from '../Modal/Modal';
import './Login.css';
import logo from '../../assets/images/Logo_white.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });
  
  const { login } = useAuth();

  const showModal = (title, message, type = 'info') => {
    setModal({
      isOpen: true,
      title,
      message,
      type
    });
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      title: '',
      message: '',
      type: 'info'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log('👤 Usuario ingresado:', username);
    console.log('🔐 Password ingresado:', password);

    // Validaciones manuales
    if (!username.trim()) {
      showModal('Campo requerido', 'Por favor ingresa tu usuario', 'warning');
      setLoading(false);
      return;
    }

    if (!password.trim()) {
      showModal('Campo requerido', 'Por favor ingresa tu contraseña', 'warning');
      setLoading(false);
      return;
    }

    try {
    const result = await login(username, password);
    
    if (result.success) {
      showModal('¡Bienvenido!', `Has iniciado sesión correctamente como ${result.data.name}`, 'success');
      
      // La redirección se maneja automáticamente por el cambio de isAuthenticated
      // No necesitas hacer navigate manualmente
    } else {
      showModal('Error de login', result.error, 'error');
    }
  } catch (error) {
    showModal('Error', 'Ocurrió un error inesperado', 'error');
  } finally {
    setLoading(false);
  }
  };

  return (
    <>
      <div className="login-wrapper">
        {/* Círculos azules en movimiento aleatorio */}
        <div className="floating-circles">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>

        <div className="login-layout">
          {/* Sección izquierda - Logo CON TRANSPARENCIA */}
          <div className="logo-section">
            <div className="logo-container">
              <div className="logo-pulse"></div>
              <img src={logo} alt="InnPulse 360" className="logo-image" />
            </div>
          </div>

          {/* Sección derecha - Formulario SIN TRANSPARENCIA */}
          <div className="form-section">
            <div className="login-card">
              <div className="welcome-section">
                <h2>¡Bienvenido a InnPulse360!</h2>
              </div>

              <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Usuario</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-input"
                    placeholder="Ingresa tu usuario"
                    disabled={loading}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    placeholder="Ingresa tu contraseña"
                    disabled={loading}
                  />
                </div>

                <div className="divider">
                  <span className="divider-line"></span>
                </div>

                <button 
                  type="submit" 
                  className="login-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner"></span>
                      Conectando...
                    </>
                  ) : (
                    'Iniciar sesión'
                  )}
                </button>

                <div className="register-section">
                  <span>¿No tienes cuenta? </span>
                  <a href="#" className="register-link">Contacta al administrador</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para notificaciones */}
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
    </>
  );
};

export default Login;