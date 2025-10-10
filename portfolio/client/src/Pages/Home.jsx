import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import profilePic from "../imagen/jhon.jpg";

export default function Home() {
  return (
    <div className="home-container">
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

      {/* Info Cards Section */}
      <div className="info-grid">
  <Link to="/about" className="info-card link-card">
    <h3>About Me</h3>
    <p>
      I'm a full-stack developer with a strong focus on building responsive,
      user-friendly web applications using modern technologies like React,
      Node.js, and MongoDB.
    </p>
  </Link>

  <div className="info-card">
    <h3>Skills</h3>
    <p>
      SQL Server, C#, Python, JavaScript, React, CSS, Git, REST APIs, Figma, Agile development, and
      teamwork.
    </p>
  </div>

  <div className="info-card">
    <h3>Contact</h3>
    <p>
      Email: jhoncap22@hotmail.com<br />
      LinkedIn: www.linkedin.com/in/jhon-christopher-adames-pérez-b6b078248
      Phone: 905-439-5767
    </p>
  </div>
</div>


      <div className="home-actions">
        <Link to="/about" className="btn btn-primary">About Me</Link>
        <Link to="/services" className="btn btn-outline">My Services</Link>
      </div>
    </div>
  );
}