import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Login"; // Corregido: Login está en components
import Layout from "./components/Layout"; // Usamos Layout como la página principal del portafolio
import Register from "./components/Register"; // Importamos el componente de registro
import ProjectsList from "./components/ProjectsList"; // Importamos el dashboard

function App() {
  const [user, setUser] = useState(() => {
    // Intentamos recuperar el usuario de localStorage al iniciar
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Usamos un componente interno para poder usar el hook useNavigate
  // y pasarlo a las funciones de manejo de sesión.
  return (
    <Router>
      <AppContent user={user} setUser={setUser} />
    </Router>
  );
}

function AppContent({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    // La navegación ahora se maneja dentro de Login/Register
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/"); // Vuelve a la página principal
  };

  return (
    <Routes>
      <Route path="/" element={<Layout user={user} onSignOut={handleSignOut} />} />
      <Route path="/primer-portfolio" element={<Layout user={user} onSignOut={handleSignOut} />} />
      {/* Ahora pasamos también onSignOut a ProjectsList */}
      <Route path="/dashboard" element={user ? <ProjectsList user={user} onSignOut={handleSignOut} /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/register" element={<Register onRegister={handleLogin} />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
