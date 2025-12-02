import React from "react";
import "./Home.css";
import profilePic from "../imagen/jhon.png";
import ParticlesBackground from "../components/ParticlesBackground";

// Icons
import { FaReact, FaPython, FaDatabase, FaJsSquare, FaFileAlt, FaCode } from "react-icons/fa";
import { SiBootstrap, SiCss3, SiSap } from "react-icons/si";

export default function Home() {
  const techs = [
    { icon: FaReact, name: "React" },
    { icon: FaPython, name: "Python" },
    { icon: FaDatabase, name: "SQL Server" },
  { icon: FaCode, name: "C#" },
    { icon: FaJsSquare, name: "JavaScript" },
    { icon: SiBootstrap, name: "Bootstrap" },
    { icon: SiCss3, name: "CSS" },
    { icon: SiSap, name: "SAP B1" },
    { icon: FaFileAlt, name: "Crystal Reports" },
  ];

  return (
    <div className="home-container">
      {/* Fondo de partículas */}
      <ParticlesBackground />

      {/* Contenido encima de partículas */}
      <div className="home-content">
        <h1>Welcome, I'm Jhon Adames</h1>

        <img
          src={profilePic}
          alt="Profile of Jhon Adames"
          className="profile-img"
        />

        <p className="welcome-message">
          Hi! I'm Jhon Adames, a passionate developer eager to build creative and
          functional solutions through technology.
        </p>

        <p className="mission-statement">
          <strong>My Mission:</strong> To continuously grow as a developer,
          contribute to meaningful projects, and create software that helps people
          in their daily lives.
        </p>

        {/* Grid de información */}
        <div className="info-grid">
          <div className="info-card">
            <h3>About Me</h3>
            <p>
              Full-stack developer focused on building responsive, user-friendly web applications using React, Node.js, and MongoDB.
            </p>
          </div>

          <div className="info-card">
            <h3>Skills</h3>
            <p>
              SQL Server, C#, Python, JavaScript, React, CSS, Git, REST APIs, Figma, Agile development.
            </p>
          </div>

          <div className="info-card">
            <h3>Contact</h3>
            <p>
              Email: jhoncap22@hotmail.com<br />
              LinkedIn: www.linkedin.com/in/jhon-christopher-adames-pérez<br />
              Phone: 905-439-5767
            </p>
          </div>
        </div>

        {/* Icons de tecnologías usando react-icons para consistencia */}
        <div className="icons-section">
          <h2>Technologies I Work With</h2>
          <div className="icons-grid">
            {techs.map((tech, idx) => {
              // Añadimos una guarda: si el objeto tech no existe, no renderizamos nada.
              // Esto previene el error si hay un elemento undefined en el array.
              if (!tech) return null;

              const Icon = tech.icon;
              return (
                <div key={idx} className="icon-box">
                  <div className="icon-wrapper">
                    <Icon className="tech-icon" />
                  </div>
                  <p>{tech.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
