import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import { getProjects } from "../api/api"; // 1. Importamos la función de la API

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
    <div>
      <Navbar />
      <main style={{ padding: '2rem' }}>
        <h1>Bienvenido a Mi Portafolio</h1>
        <h2>Mis Proyectos</h2>
        {loading && <p>Cargando proyectos...</p>} {/* Muestra si está cargando */}
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Muestra si hay un error */}
        {projects.length > 0 && (
          <ul>
            {projects.map((project) => (
              <li key={project._id}>{project.title} - {project.description}</li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default PrimerPortfolio;