import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');

  // Si hay token, renderiza el contenido de la ruta (usando Outlet).
  // Si no, redirige a /login.
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;