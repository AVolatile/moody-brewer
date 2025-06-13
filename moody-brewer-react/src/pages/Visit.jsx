import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import './Visit.css';

const Visit = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  return (
    <>
      <Navbar />
      <main className={`visit-page ${fadeIn ? 'fade-in' : ''}`}>
        <div className="visit-container">
          <h1>Visit Us</h1>
          <p>📍 <strong>1219 Main Street, West Warwick, RI</strong></p>
          <p>🕒 <strong>Open Tuesday – Saturday | 7AM – 3PM</strong></p>
          <iframe 
            src="https://www.google.com/maps?q=1219+Main+Street,+West+Warwick,+RI&output=embed" 
            width="100%" 
            height="300"
            allowFullScreen
          ></iframe>
          <div className="map-buttons">
            <a href="https://maps.google.com/?q=1219+Main+Street,+West+Warwick,+RI" className="btn" target="_blank" rel="noopener noreferrer">Google Maps</a>
            <a href="http://maps.apple.com/?address=1219+Main+Street,+West+Warwick,+RI" className="btn" target="_blank" rel="noopener noreferrer">Apple Maps</a>
          </div>
        </div>
      </main>
    </>
  );
};

export default Visit;
