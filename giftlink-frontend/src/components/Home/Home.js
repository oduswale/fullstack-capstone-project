import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'; // Import the CSS

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-body">
      <div className="content text-center">
        <h1>GiftLink</h1>
        <h2>Share Gifts and Joy!</h2>
        <p className="lead">
          "Sharing is the essence of community. It is through giving that we enrich and perpetuate both our lives and the lives of others."
        </p>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate('/app')}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
