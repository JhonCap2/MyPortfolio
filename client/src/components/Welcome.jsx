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
        Welcome to my portfolio. You can browse the old portfolio or log in to the Backend and Frontend section.
      </p>
      <div className="button-group fade-in delay-2">
        <Link to="/primer-portfolio">
          <button>See First Portfolio</button>
        </Link>
        <button onClick={() => navigate("/login")}>
          Go to the New Backend and Frontend Login
        </button>
      </div>
    </div>
  );
}
