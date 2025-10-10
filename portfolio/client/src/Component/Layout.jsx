import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaHome, FaUser, FaProjectDiagram, FaTools } from "react-icons/fa";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="layout-container">
      <h1>My Portfolio</h1>
      <nav className="navbar">
        <Link to="/" className="nav-button home">
          <div className="icon-section"><FaHome /></div>
          <div className="text-section">Home</div>
        </Link>
        <Link to="/projects" className="nav-button projects">
          <div className="icon-section"><FaProjectDiagram /></div>
          <div className="text-section">Projects</div>
        </Link>
        <Link to="/services" className="nav-button services">
          <div className="icon-section"><FaTools /></div>
          <div className="text-section">Services</div>
        </Link>
        <Link to="/about" className="nav-button about">
          <div className="icon-section"><FaUser /></div>
          <div className="text-section">About</div>
        </Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}