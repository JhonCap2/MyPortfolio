import React from 'react';
import Navbar from '../components/Navbar'; // Importa el Navbar

const PrimerPortfolio = () => {
  return (
    <div>
      <Navbar /> {/* Añade el Navbar aquí */}
      
      {/* El resto de tu contenido del portafolio va aquí */}
      <main style={{ padding: '2rem' }}>
        <h1>Bienvenido a Mi Portafolio</h1>
        <p>Este es el contenido principal de la página.</p>
        <button className="btn btn-success">Agregar</button>
        <button className="btn btn-danger" style={{ marginLeft: '10px' }}>Borrar</button>
      </main>
    </div>
  );
};

export default PrimerPortfolio;