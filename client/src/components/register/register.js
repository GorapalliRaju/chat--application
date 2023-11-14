// Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      if (username && password && confirmPassword && password === confirmPassword) {
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          const errorMessage = errorData ? errorData.error || 'Error registering user' : 'Network response was not ok';
          console.error('Server returned an error:', response.status, response.statusText, errorData);
          throw new Error(errorMessage);
        }
  
        const data = await response.json();
  
        if (data.success) {
          alert(data.message); // Display a success message or handle as needed
          navigate('/');
        } else {
          if (data.error === 'Username already exists') {
            setError('Username already exists. Please choose a different username.');
          } else {
            setError(data.error || 'Error registering user'); // Display the error message
          }
        }
      } else {
        setError('Invalid registration details');
      }
    } catch (error) {
      console.error('Error registering:', error.message);
      setError('Error registering user');
    }
  };
  
  

  return (
    <div className="center-align">
      <div className="register-container">
        <h2>Register</h2>
        <div className="register-form-group">
          <label htmlFor="username" className="register-label">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="register-input"
          />
        </div>
        <div className="register-form-group">
          <label htmlFor="password" className="register-label">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
          />
        </div>
        <div className="register-form-group">
          <label htmlFor="confirmPassword" className="register-label">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="register-input"
          />
        </div>
        {error && <div className="register-error-message">{error}</div>}
        <button onClick={handleRegister} className="register-button">Register</button>
        <p className="register-p">
          Already have an account? <Link to="/" className="register-link">Login now</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
