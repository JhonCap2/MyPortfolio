import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Importamos Link para la navegación
import {
  FaHome, FaUser, FaProjectDiagram, FaTools,
  FaBook, FaPhone, FaGithub, FaLinkedin
} from "react-icons/fa";
import Logo from "../imagen/jhlogo.png";

// Páginas
import Home from "../Pages/Home";
import Projects from "../Pages/Projects";
import Services from "../Pages/Services";
import Contact from "../Pages/Contact";
import Education from "../Pages/Education";
import About from "../Pages/About";

import "./Layout.css";

export default function Layout({ user, onSignOut }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFloatingBar, setShowFloatingBar] = useState(false);

  const createdBy = "Jhon Adames";
  const createdDate = "2025-09-20";

  const handleToggle = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      setShowFloatingBar(scrollTop + windowHeight >= fullHeight - 20 || fullHeight <= windowHeight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70; // altura del navbar
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    
    <div className="layout-container">
      
      {/* Navbar */}
      <div className="navbar-container">
        {/* Contenedor principal para logo y enlaces */}
        <div className={`nav-main ${menuOpen ? "open" : ""}`}>
          <Link to="/" className="navbar-logo-link">
            <img src={Logo} alt="Logo JH" className="logo" />
          </Link>
          <div className="nav-left">
            <div className="nav-buttons">
              <button className="nav-button" onClick={() => scrollToSection("home")}><FaHome /> Home</button>
              <button className="nav-button" onClick={() => scrollToSection("projects")}><FaProjectDiagram /> Projects</button>
              <button className="nav-button" onClick={() => scrollToSection("services")}><FaTools /> Services</button>
              <button className="nav-button" onClick={() => scrollToSection("education")}><FaBook /> Education</button>
              <button className="nav-button" onClick={() => scrollToSection("about")}><FaUser /> About</button>
              <button className="nav-button" onClick={() => scrollToSection("contact")}><FaPhone /> Contact</button>
              {user ? (
                <button onClick={onSignOut} className="nav-button login-button">
                  Cerrar Sesión
                </button>
              ) : (
                <Link to="/login" className="nav-button login-button">
                  Login
                </Link>
              )}
            </div>
            <div className="nav-socials">
              <a href="https://github.com/JhonCap2" target="_blank" rel="noopener noreferrer"><FaGithub size={20} /></a>
              <a href="https://www.linkedin.com/in/jhon-christopher-adames-pérez-b6b078248" target="_blank" rel="noopener noreferrer"><FaLinkedin size={20} /></a>
            </div>
          </div>
        </div>

        {/* Contenedor para login y menú hamburguesa */}
        <div className="nav-right">
          <div className="menu-toggle" onClick={handleToggle}>&#9776;</div>
        </div>

        
      </div>

      {/* Secciones con clases individuales para fondos */}
      <section id="home" className="home-page"><Home /></section>
      <section id="projects" className="projects-page"><Projects /></section>
      <section id="services" className="services-page"><Services /></section>
      <section id="education" className="education-page"><Education /></section>
      <section id="about" className="about-page"><About /></section>
      <section id="contact" className="contact-page"><Contact /></section>

      {/* Barra flotante */}
      {showFloatingBar && (
        <div className="floating-bar show">
          <div className="content">
            <div className="author-info">
              Created by {createdBy} on {createdDate}
            </div>
            <div className="home-actions">
              <button onClick={() => scrollToSection("about")}>About Me</button>
              <button onClick={() => scrollToSection("services")}>My Services</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
