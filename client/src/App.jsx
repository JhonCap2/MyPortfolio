import { useState } from "react";
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
  );
}

export default App;
