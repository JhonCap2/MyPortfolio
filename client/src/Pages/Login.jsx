import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
// We assume you have a function in your API for login
import { loginUser } from '../api/api'; 

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to show/hide password

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Good practice: clear any old token before attempting a new login.
    localStorage.removeItem('token');
    setError(''); // Clear previous errors

    // 1. Client-side validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return; // Stop execution if there is an error
    }

    setIsLoading(true);

    try {
      // 2. API Call.
      const userData = await loginUser(formData);

      // 3. SUCCESS VERIFICATION: We explicitly check if the response contains a token.
      if (userData && userData.token) {
        // SUCCESS: We save the token and notify the parent component (App.jsx).
        localStorage.setItem('token', userData.token);
        onLogin(userData.user); // Corrected: We pass only the 'user' object
      } else {
        // CREDENTIALS FAILURE: If there is no token, the API returned an error.
        // We show the error message from the API.
        setError(userData.message || 'Invalid credentials.');
      }
    } catch (err) {
      // 4. NETWORK FAILURE: This block will only execute if there is a connection problem or an unexpected error.
      setError(err.message || 'Connection or server error.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container" style={{ backgroundColor: '#fff' }}>
      <div className="login-box">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="toggle-password">
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="register-link">Don't have an account? <Link to="/register">Register here</Link></p> 
        <Link to="/" className="btn btn-secondary btn-back">Back to Portfolio</Link>
      </div>
    </div>
  );
};

export default Login;