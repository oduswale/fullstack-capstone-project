import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ username, setUsername }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('user-name');
    setUsername(null);
    navigate('/app/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">GiftLink</Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/app">Gifts</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/app/search">Search</Link>
          </li>

          {username ? (
            <>
              <li className="nav-item">
                <span className="nav-link">Hello, {username}</span>
              </li>
              <li className="nav-item">
                <button className="nav-link logout-btn btn btn-link" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/app/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/app/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
