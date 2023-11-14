import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (username && password) {
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
          console.error('Server returned an error:', response.status, response.statusText);
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.success) {
          // Authentication successful, redirect to the join page or some other page
          navigate('/join');
        } else {
          setError(data.error || 'Invalid credentials');
        }
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Error during login');
    }
  };

  return (
    <div className="center-align">
      <div className="login-container">
        <h2>Login</h2>
        <div className="login-form-group">
          <label htmlFor="username" className="login-label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="password" className="login-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
        </div>
        {error && <div className="login-error-message">{error}</div>}
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
        <p className="login-p">
          Don't have an account? <Link to="/register" className="login-link">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
