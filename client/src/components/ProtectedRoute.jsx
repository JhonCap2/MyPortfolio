import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ProtectedRoute = () => {
  const { user } = useAuth(); // Obtenemos el usuario del contexto

  // Si hay un usuario autenticado, renderiza el contenido de la ruta (usando Outlet).
  // Si no, redirige a la página de login.
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;