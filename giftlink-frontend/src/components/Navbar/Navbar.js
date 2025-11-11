import React from 'react';
import { Link } from 'react-router-dom'; // <-- import Link

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {/* Brand Logo / Name */}
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
                    {/* Links using React Router */}
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link> {/* Home page */}
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/app">Gifts</Link> {/* MainPage */}
                    </li>
                </ul>
            </div>
        </nav>
    );
}
