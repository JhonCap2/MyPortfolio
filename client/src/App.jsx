import { useState } from "react";
<<<<<<< HEAD
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
=======
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import PrimerPortfolio from "./components/Layout"; // tu antiguo portfolio
import WelcomePage from "./components/Welcome";
import Dashboard from "./components/ProjectsList";
// import { signout } from "./api/api"; // Asume que tienes signout en tu api.js

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  // Usamos un componente interno para poder usar el hook useNavigate
>>>>>>> 75cc6ea4acf6924a982ca54087ab6f5d9205cc24
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
<<<<<<< HEAD
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
=======
    navigate("/dashboard"); // Redirige al dashboard
  };

  const handleSignOut = async () => {
    // await signout(); // Llama a la API de signout (opcional pero buena práctica)
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
      <Routes>
        {user ? (
          // --- Rutas para usuarios logueados ---
          <>
            <Route path="/dashboard" element={<DashboardRedirect user={user} handleSignOut={handleSignOut} />} />
            <Route path="/primer-portfolio" element={<PrimerPortfolio />} />
            {/* Redirige cualquier otra ruta al dashboard si está logueado */}
            <Route path="*" element={<DashboardRedirect user={user} handleSignOut={handleSignOut} />} />
          </>
        ) : (
          // --- Rutas para usuarios NO logueados ---
          <>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/primer-portfolio" element={<PrimerPortfolio />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register onRegister={handleLogin} />} />
            {/* Si intenta ir a otra ruta sin loguear, lo mandamos a la bienvenida */}
            <Route path="*" element={<WelcomePage />} />
          </>
        )}
      </Routes>
  );
}

// Componente para renderizar el layout del Dashboard
function DashboardRedirect({ user, handleSignOut }) {
  return (
    <div style={{ minHeight: "100vh", padding: "20px", backgroundColor: "#242424" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', color: 'white' }}>
        <h1>My Portfolio Dashboard</h1>
        <button onClick={handleSignOut} className="signout-button">
          Sign Out
        </button>
      </div>
      <div style={{ textAlign: "center", marginBottom: "25px", color: "#fff" }}>
        <p>Bienvenido, {user.name} ({user.role || 'user'})</p>
      </div>
      <Dashboard user={user} />
    </div>
>>>>>>> 75cc6ea4acf6924a982ca54087ab6f5d9205cc24
  );
}

export default App;
