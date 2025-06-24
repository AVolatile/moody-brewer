import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Visit.css';

const Visit = () => {
  return (
    <>
      <Navbar />

      <main className="visit-page fade-in">
        {/* Background Video */}
        <div className="video-bg">
          <video autoPlay muted loop playsInline>
            <source src="/assets/videos/ig-reel-2.mp4" type="video/mp4" />
          </video>
          <div className="video-overlay"></div>
        </div>

        <section className="visit-box">
          <h1 className="visit-title">Plan Your Visit</h1>

          <div className="visit-info">
            <p><i className="fa-solid fa-location-dot"></i> 1219 Main Street, West Warwick, RI</p>
            <p><i className="fa-solid fa-clock"></i> Open Tuesday – Saturday | 7AM – 3PM</p>
          </div>

          <div className="visit-map">
            <iframe
              src="https://www.google.com/maps?q=1219+Main+Street,+West+Warwick,+RI&output=embed"
              title="The Moody Brewer Map"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

          <div className="map-buttons fancy-links">
            <a href="https://maps.google.com/?q=1219+Main+Street,+West+Warwick,+RI" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-google"></i> Google Maps
            </a>
            <a href="http://maps.apple.com/?address=1219+Main+Street,+West+Warwick,+RI" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-apple"></i> Apple Maps
            </a>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Visit;
