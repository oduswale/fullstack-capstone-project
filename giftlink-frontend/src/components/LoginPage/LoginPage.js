import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3060/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem('auth-token', data.token);
        sessionStorage.setItem('user-name', data.firstName);
        navigate('/app');
      } else {
        alert('Login failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-card p-4 border rounded">
        <h2 className="text-center mb-4 font-weight-bold">Login</h2>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>
          Login
        </button>

        <p className="mt-4 text-center">
          Don't have an account? <a href="/app/register" className="text-primary">Register</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
