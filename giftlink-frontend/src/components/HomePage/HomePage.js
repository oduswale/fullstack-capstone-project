import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './HomePage.css';
import bgImage from '../../assets/images/background-colors.jpg';

export default function HomePage() {
  return (
    <div
      className="container my-5 content"
      style={{ '--bg-image': `url(${bgImage})` }} // Pass image as CSS variable
    >
      <div className="text-center">
        <h1 className="display-4 mb-3">GiftLink</h1>
        <h2 className="mb-4">Share Gifts and Joy!</h2>
        <p className="lead">
          "Sharing is the essence of community. It is through giving that we enrich and perpetuate both our lives and the lives of others."
        </p>
        {/* React Router Link instead of <a> to avoid HTML/JSON errors */}
        <Link to="/app" className="btn btn-primary">
          Get Started
        </Link>
      </div>
    </div>
  );
}
