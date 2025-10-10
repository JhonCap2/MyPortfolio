import React from 'react';
import './Projects.css'; // Solo importar el CSS
import project1Image from '../imagen/pokeapp.png';
import project2Image from '../imagen/project1.png';
import project3Image from '../imagen/project1.png';

const projects = [
  {
    title: 'Pokedex web',
    image: project1Image,
    description: 'A REST API that manages your database with information on all Pokémon locally on SQL Server. It also provides a website that allows you to view this information and images of each Pokémon created with React.',
    outcome: 'An application that fulfilled its purpose: displaying all the Pokémon, along with their general information and image.'
  },
  {
    title: 'Weather Dashboard',
    image: project2Image,
    description: 'A responsive weather dashboard using OpenWeather API. I handled API integration and UI design for real-time weather updates.',
    outcome: 'Enhanced user experience with dynamic data and location-based forecasts.'
  },
  {
    title: 'E-commerce Platform',
    image: project3Image,
    description: 'An online store built with React and Firebase. I worked on authentication, product listing, and cart functionality.',
    outcome: 'Successfully launched with over 500 active users in the first month.'
  }
];

const Projects = () => {
  return (
    <div className="projects-container">
      <h1>My Projects</h1>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <img src={project.image} alt={project.title} className="project-image" />
            <div className="project-info">
              <h2>{project.title}</h2>
              <p><strong>Role:</strong> {project.description}</p>
              <p><strong>Outcome:</strong> {project.outcome}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
