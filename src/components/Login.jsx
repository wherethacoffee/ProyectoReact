import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import logo from '../images/iniciar-sesion.png';
import '../styles/LoginStyle.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const recaptchaRef = React.createRef();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica el captcha aquí (puedes implementar tu lógica de verificación aquí)
    setIsCaptchaVerified(true); // Simulación de verificación del captcha para propósitos de demostración

    // Simulación de verificación del usuario como administrador
    // Cambia esta lógica según tu sistema de autenticación
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (isCaptchaVerified && username === 'admin' && password === 'admin') {
      // Si el captcha es correcto y las credenciales son de un administrador, redirige a la página de inicio
      onLogin(username, password); // Llama a la función onLogin para actualizar el estado de isLoggedIn y isAdmin
      navigate('/');
    } else {
      // Lógica para mostrar mensajes de error o manejar el acceso no autorizado
      console.log('Acceso no autorizado');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img className="login-logo" src={logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuario:</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              placeholder="Ejemplo: usuario123"
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" name="password" required className="input-field" />
          </div>
          <div className="form-group">
            <ReCAPTCHA
              sitekey="6Legf70oAAAAAO6RUj038AiJITYbnKr0vCVwZnig"
              size="invisible"
              ref={recaptchaRef}
              className="g-recaptcha"
            />
          </div>
          <button type="submit" className="login-button">
            Acceder
          </button>
        </form>
        <button className="create-account-button">
          <a href="/crear-cuenta">Crear una cuenta nueva</a>
        </button>
      </div>
    </div>
  );
};

export default Login;
