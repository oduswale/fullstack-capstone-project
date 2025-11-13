import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import MainPage from './components/MainPage/MainPage';
import DetailsPage from './components/DetailsPage/DetailsPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import SearchPage from './components/SearchPage/SearchPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  // State for logged-in user
  const [username, setUsername] = useState(null);

  // Check session storage on app load
  useEffect(() => {
    const storedUsername = sessionStorage.getItem('user-name');
    if (storedUsername) setUsername(storedUsername);
  }, []);

  return (
    <>
      <Navbar username={username} setUsername={setUsername} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/app" element={<MainPage />} />
        <Route path="/app/product/:productId" element={<DetailsPage />} />
        <Route path="/app/login" element={<LoginPage setUsername={setUsername} />} />
        <Route path="/app/register" element={<RegisterPage />} />
        <Route path="/app/search" element={<SearchPage />} />
      </Routes>
    </>
  );
}

export default App;
