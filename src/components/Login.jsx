import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import logo from '../images/iniciar-sesion.png';
import '../styles/LoginStyle.css'; // Importa los estilos específicos del login

const Login = () => {
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const recaptchaRef = React.createRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica el captcha
    recaptchaRef.current.executeAsync().then((captchaValue) => {
      // Si el captcha es correcto, actualiza el estado para habilitar el botón de "Acceder"
      setIsCaptchaVerified(true);
      console.log('Captcha Value:', captchaValue);
      // Aquí puedes implementar la lógica para verificar el captcha y enviar los datos del formulario al servidor
    });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img className="login-logo" src={logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuario:</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" name="password" required />
          </div>
          {/* Implementa el captcha aquí */}
          <div className="form-group">
            <ReCAPTCHA
              sitekey="6Legf70oAAAAAO6RUj038AiJITYbnKr0vCVwZnig"
              size="invisible"
              ref={recaptchaRef}
              className="g-recaptcha"
            />
          </div>
          <button type="submit" className="login-button" disabled={!isCaptchaVerified}>
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
