import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Reutiliza el mismo CSS

export default function Register({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Error en registro");
      } else {
        // Intentar login automático después de registrarse
        const loginRes = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim(),
            password: password.trim(),
          }),
        });

        const loginData = await loginRes.json();

        if (loginRes.ok) {
          localStorage.setItem("token", loginData.token);
          onRegister(loginData.user);
          navigate("/"); // redirigir a home
        } else {
          setMessage("Registrado pero error al iniciar sesión");
        }
      }
    } catch (err) {
      setMessage("Error de conexión al servidor");
      console.error(err);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-image"></div>

      <div className="login-form-container">
        <div className="form-box">
          <h2>Create Account</h2>
          <p className="subtitle">
            Join us today! Fill in the details below.
          </p>

          <form onSubmit={handleRegister}>
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <div className="checkbox-row">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                I agree to the <span style={{ color: "#007bff" }}>Terms</span> &
                <span style={{ color: "#007bff" }}> Privacy Policy</span>
              </label>
            </div>

            <button type="submit" className="login-button">
              Register
            </button>
          </form>

          <p className="register-text">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Sign in</span>
          </p>

          {message && <p className="login-message">{message}</p>}
        </div>
      </div>
    </div>
  );
}
