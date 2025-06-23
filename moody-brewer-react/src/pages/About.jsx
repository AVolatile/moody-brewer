import React, { useEffect, useState } from 'react';
import './About.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; 

const About = () => {
  const videoSources = [
    "/assets/videos/ig-reel-2.mp4",
    "/assets/videos/ig-reel-3.mp4",
    "/assets/videos/ig-reel-1.mp4"
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videoSources.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="about-page">
      <video
        key={currentIndex}
        autoPlay
        muted
        loop
        playsInline
        className="video-bg"
      >
        <source src={videoSources[currentIndex]} type="video/mp4" />
      </video>
      <div className="video-overlay"></div>

      <Navbar />

      <main className="about-section">
        <h1 className="about-title">Our Story</h1>
        <div className="about-content">
          <p>
            At <span>The Moody Brewer</span>, coffee isn’t just a drink—it’s a ritual, a comfort, and a celebration of community.
            Born out of a love for rich flavors and heartfelt connections, our mission is to brew more than just the perfect cup.
            We exist to create a space that feels like home, where the ambiance warms your soul just as much as the latte in your hands.
          </p>
          <p>
            Our menu is a reflection of creativity, quality, and passion. Every drink is crafted with care,
            every bite thoughtfully prepared. Whether you're unwinding alone or catching up with friends,
            this is your space to savor the moment.
          </p>
          <p>
            Thank you for being part of the Moody family. Let’s raise a cup to more stories, more flavors, and more memories.
          </p>
        </div>
      </main>
    <Footer />
    </div>

  );
};

export default About;
