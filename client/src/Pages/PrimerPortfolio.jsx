import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import { getProjects } from "../api/api"; // 1. Importamos la función de la API
import './PrimerPortfolio.css'; // Importamos los nuevos estilos

const PrimerPortfolio = () => {
  // 2. Creamos estados para guardar los proyectos, el estado de carga y los errores
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 3. Usamos useEffect para obtener los datos cuando el componente se monta
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const projectsData = await getProjects();
        setProjects(projectsData); // Guardamos los proyectos en el estado
        setError(null); // Limpiamos cualquier error anterior
      } catch (err) {
        setError("Error al cargar los proyectos.");
        console.error(err);
      } finally {
        setLoading(false); // Dejamos de cargar, ya sea con éxito o con error
      }
    };
  
    fetchProjects();
  }, []); // El array vacío asegura que se ejecute solo una vez
  
  return (
    // Añadimos un estilo en línea para forzar el fondo blanco.
    // Para unificar todas las páginas, lo ideal es poner este estilo
    // en un archivo CSS global (ej. index.css) dentro de la regla 'body'.
    <div 
      className="portfolio-container" 
      style={{ backgroundColor: '#fff', minHeight: '100vh', padding: '20px' }}>
      <Navbar />
      <main>
        <h1>Portafolio Dinámico</h1>
        <h2>Mis Proyectos</h2>
        {loading && <p className="loading-message">Cargando proyectos...</p>}
        {error && <p className="error-message">{error}</p>}
        
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project._id} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PrimerPortfolio;