import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext"; // Corregimos la ruta de importación

// --- Componentes de página y autenticación ---
import Login from "./pages/Login";
import Register from "./components/Register";
import ProjectsList from "./components/ProjectsList";
import Layout from "./components/Layout"; // Importamos el Layout del portafolio
import Profile from "./components/Profile";

// Componentes de ruta protegida
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

// Estilos globales
import "./App.css";

// --- Componente Wrapper para la lógica de enrutamiento ---
// Esto nos permite usar el hook `useNavigate` fuera del contexto del Router principal
const AppWrapper = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

// --- Componente que define las rutas de la aplicación ---
const AppRoutes = () => {
  const { user, loading, handleLogin, handleRegister } = useAuth();

  // Muestra un spinner mientras se verifica el token
  if (loading) {
    return <div className="spinner-container"><div className="spinner"></div></div>;
  }

  return (
    <Routes>
      {/* --- Ruta Principal (Tu Portafolio - "primerporfolio") --- */}
      <Route path="/" element={<Layout />} />

      {/* --- Rutas Públicas de Autenticación --- */}
      <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!user ? <Register onRegister={handleRegister} /> : <Navigate to="/dashboard" />} />

      {/* --- Rutas Protegidas (solo para usuarios autenticados) --- */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<ProjectsList />} />
        <Route path="/profile" element={<Profile />} />
        <Route element={<AdminRoute />}>
          {/* Aquí puedes añadir rutas que solo los admins pueden ver */}
        </Route>
      </Route>

      {/* Redirección para rutas no encontradas: lleva a la página principal. */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppWrapper;
