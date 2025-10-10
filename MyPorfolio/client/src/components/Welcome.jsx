// src/components/WelcomePage.jsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Welcome.css";

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1 className="fade-in">Welcome to Frontend!</h1>
      <p className="fade-in delay-1">
        Bienvenido a mi portfolio. Puedes explorar el antiguo portfolio o iniciar sesión en el apartado Backend y Frontend.
      </p>
      <div className="button-group fade-in delay-2">
        <Link to="/primer-portfolio">
          <button>Ver Primer Portfolio</button>
        </Link>
        <button onClick={() => navigate("/login")}>
          Ir al Login del Nuevo Backend y Frontend
        </button>
      </div>
    </div>
  );
}
