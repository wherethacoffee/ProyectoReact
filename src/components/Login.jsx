import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import logo from '../images/iniciar-sesion.png';
import '../styles/LoginStyle.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleCaptchaChange = (value) => {
    console.log('Captcha value:', value);
    // Verifica el valor del captcha aquí (puedes implementar tu lógica de verificación aquí)
    // Por ejemplo, puedes enviar el valor del captcha a tu servidor para su verificación
    setIsCaptchaVerified(true); // Simulación de verificación del captcha para propósitos de demostración
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    if (!isCaptchaVerified) {
      setErrorMessage('Favor de completar el captcha.'); // Establece el mensaje de error si el captcha no está verificado
      return; // Evita continuar con el proceso de inicio de sesión si el captcha no está verificado
    }

    if (username === 'admin' && password === 'admin') {
      onLogin(username, password);
      navigate('/');
    } else {
      setErrorMessage('Credenciales incorrectas.'); // Establece el mensaje de error si las credenciales son incorrectas
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
              sitekey="6LcF6cgoAAAAAOAwgY6TiWQPxfVD_DZ40yNH7Ss_"
              onChange={handleCaptchaChange}
              className="g-recaptcha"
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
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
