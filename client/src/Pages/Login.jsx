import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  return (
    <div className="login-container" style={{ backgroundColor: '#fff' }}>
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <form>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className="btn btn-primary">Entrar</button>
        </form>
        <Link to="/" className="btn btn-secondary btn-back">
          Volver al Portafolio
        </Link>
      </div>
    </div>
  );
};

export default Login;