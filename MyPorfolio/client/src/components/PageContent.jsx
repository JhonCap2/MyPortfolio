import React, { useState, useEffect } from "react";

const PageContent = ({ children }) => {
  const [hideContent, setHideContent] = useState(false);

  useEffect(() => {
    // evitar que el contenido se oculte inmediatamente en el montaje
    const navbarHeight = 80; // altura de referencia
    const extraThreshold = 50; // margen extra para evitar falso positivo
    const threshold = navbarHeight + extraThreshold;

    const handleScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset || 0;

      // Ocultar contenido solo si se supera un umbral mayor
      if (scrollTop > threshold) {
        setHideContent(true);
      } else {
        setHideContent(false);
      }
    };

    // Registrar el listener con un pequeño retraso para evitar lecturas
    // de scroll durante el montaje que puedan aplicar la clase hidden.
    const timer = setTimeout(() => {
      window.addEventListener("scroll", handleScroll);
    }, 100);

    // También comprobar el scroll inicial pero sin aplicar hidden si estamos
    // en la posición superior (evita ocultar en navegaciones internas).
    const initialScroll = window.scrollY || window.pageYOffset || 0;
    if (initialScroll <= navbarHeight) {
      setHideContent(false);
    } else {
      // Si realmente estamos más abajo que la navbar, respetar el umbral
      setHideContent(initialScroll > threshold);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`page-content ${hideContent ? "hidden" : ""}`}>
      {children}
    </div>
  );
};

export default PageContent;
