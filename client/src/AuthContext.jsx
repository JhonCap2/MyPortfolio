import React, { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Efecto para verificar la sesión del usuario al cargar la app
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedUser = jwtDecode(token);
        // Comprueba si el token ha expirado
        if (decodedUser.exp * 1000 > Date.now()) {
          setUser(decodedUser);
        } else {
          console.warn("Token expirado, sesión limpiada.");
          localStorage.removeItem("token");
        }
      }
    } catch (error) {
      // Este catch ahora atrapará errores de decodificación de un token malformado.
      console.error("Token inválido o corrupto:", error);
      localStorage.removeItem("token");
    } finally {
      // Aseguramos que el estado de carga siempre termine
      setLoading(false);
    }
  }, []); // El array vacío asegura que se ejecute solo una vez

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    navigate("/dashboard");
  };

  const handleRegister = (registeredUser) => {
    setUser(registeredUser);
    navigate("/dashboard");
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const value = {
    user,
    loading,
    setUser,
    handleLogin,
    handleRegister,
    handleSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};