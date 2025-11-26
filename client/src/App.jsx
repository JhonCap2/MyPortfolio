import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Necesitarás instalar esto: npm install jwt-decode

// Componentes de página y autenticación
import Login from "./components/Login";
import Register from "./components/Register";
import Layout from "./components/Layout";
import ProjectsList from "./components/ProjectsList";
import Profile from "./components/Profile"; // Importamos el componente Profile

// Componentes de ruta protegida
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

// Estilos globales
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Efecto para verificar la sesión del usuario al cargar la app
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        // Comprueba si el token ha expirado
        if (decodedUser.exp * 1000 > Date.now()) {
          setUser(decodedUser);
        } else {
          // Si el token expiró, lo limpiamos
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
    setLoading(false); // Finaliza la carga inicial
  }, []);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleRegister = (registeredUser) => {
    setUser(registeredUser);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Muestra un spinner mientras se verifica el token
  if (loading) {
    return <div className="spinner-container"><div className="spinner"></div></div>;
  }

  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Layout user={user} onSignOut={handleSignOut} />} />
        <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <Register onRegister={handleRegister} /> : <Navigate to="/dashboard" />} />

        {/* Rutas Protegidas (solo para usuarios logueados) */}
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/dashboard" element={<ProjectsList user={user} onSignOut={handleSignOut} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          
          {/* Rutas de Administrador (solo para rol 'admin') */}
          <Route element={<AdminRoute user={user} />}>
            {/* Aquí puedes añadir rutas que solo los admins pueden ver */}
          </Route>
        </Route>

        {/* Redirección para rutas no encontradas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

