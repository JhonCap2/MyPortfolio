import React from 'react';
import './Projects.css';
// Importamos las imágenes de los proyectos
import pokeappImage from '../imagen/pokeapp.png';
import movieWebImage from '../imagen/MovieWeb.jpg';
import montemoriahImage from '../imagen/Montemoriah.png';

const projects = [
  {
    title: 'Pokedex Web',
    image: pokeappImage,
    role: 'Web Designer And API Rest.',
    outcome: 'An application that fulfilled its purpose: displaying all the Pokémon, along with their general information and image.'
  },
  {
    title: 'Web Movie',
    image: movieWebImage,
    role: 'Full Project Creator',
    outcome: 'Improved user interaction by providing a dynamic space to explore movies and share opinions.'
  },
  {
    title: 'Montemoria Church Portal',
    image: montemoriahImage,
    role: 'Database Designer',
    outcome: 'Successfully launched, enabling efficient member registration and streamlined access to church information for the community.'
  }
];

const Projects = () => {
  return (
    <div className="projects-page page-container">
      <div className="projects-container">
        <h1>My Projects</h1>
        <div className="projects-grid">
          {projects.map(({ title, image, role, outcome }, index) => (
            <div key={index} className="project-card">
              <img src={image} alt={title} className="project-image" />
              <div className="project-info">
                <h2>{title}</h2>
                <p><strong>Role:</strong> {role}</p>
                <p><strong>Outcome:</strong> {outcome}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
