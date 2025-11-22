import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = ({ user }) => {
  // Check if user exists and has the 'admin' role
  const isAdmin = user && user.role === 'admin';

  // If the user is an admin, render the child routes.
  // Otherwise, redirect them to the dashboard or a "not authorized" page.
  // Using 'replace' prevents the user from going back to the admin page.
  return isAdmin ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default AdminRoute;