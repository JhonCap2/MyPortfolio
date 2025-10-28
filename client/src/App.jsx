import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import PrimerPortfolio from "./components/Layout"; // tu antiguo portfolio
import WelcomePage from "./components/Welcome";
import Dashboard from "./components/ProjectsList";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        {/* Página de bienvenida inicial */}
        <Route path="/" element={<WelcomePage />} />

        {/* Antiguo portfolio */}
        <Route path="/primer-portfolio" element={<PrimerPortfolio />} />

        {/* Login/Register */}
        {!user ? (
          <>
            <Route path="/login" element={<Login onLogin={setUser} />} />
            <Route path="/register" element={<Register onRegister={setUser} />} />
          </>
        ) : (
          <Route
            path="/*"
            element={
              <div style={{ minHeight: "100vh", padding: "20px" }}>
                <h1 style={{ textAlign: "center", marginBottom: "15px" }}>
                  My Portfolio Dashboard
                </h1>
                <p style={{ textAlign: "center", marginBottom: "25px", color: "#fff" }}>
                  Bienvenido, {user.name}
                </p>
                <Dashboard />
              </div>
            }
          />
        )}
      </Routes>
    </Router>
  );
}

export default App;
