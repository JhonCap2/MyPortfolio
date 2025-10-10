import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ContactsList from "./components/ContactsList";
import ProjectsList from "./components/ProjectsList";
import EducationsList from "./components/EducationsList";
import UsersList from "./components/UsersList";
import PrimerPortfolio from "./components/Layout"; // tu antiguo portfolio
import WelcomePage from "./components/Welcome";

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
              <div>
                <h1>My Portfolio, Add new information</h1>
                <p>Bienvenido, {user.name}</p>
                <ContactsList />
                <ProjectsList />
                <EducationsList />
                <UsersList />
              </div>
            }
          />
        )}
      </Routes>
    </Router>
  );
}

export default App;
