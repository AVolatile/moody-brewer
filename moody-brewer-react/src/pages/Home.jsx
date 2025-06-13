import React, { useState } from 'react';
import './Home.css';
import confetti from 'canvas-confetti';
import Navbar from '../components/Navbar';

const Home = () => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [successVisible, setSuccessVisible] = useState(false);
  const [warningVisible, setWarningVisible] = useState(false);

  const handleStarClick = (index) => {
    setSelectedRating(index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.reviewName.value.trim();
    const message = e.target.reviewText.value.trim();

    if (name && message && selectedRating > 0) {
      try {
        const response = await fetch('http://localhost:5000/api/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, message, stars: selectedRating }),
        });

        if (response.ok) {
          e.target.reset();
          setSelectedRating(0);
          setSuccessVisible(true);
          confetti();
          setTimeout(() => setSuccessVisible(false), 3000);
        }
      } catch (err) {
        console.error('Failed to submit review:', err);
      }
    }
  };

  return (
    <div className="home-page">
      {/* Video Background */}
      <div className="video-bg">
        <video className="bg-video active" autoPlay muted loop playsInline>
          <source src="/assets/videos/ig-reel-1.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <Navbar />

      {/* Hero Logo */}
<section className="hero">
  <div className="hero-logo">
    <img src="/assets/images/mb_logo.png" alt="The Moody Brewer Logo" className="hero-logo-img" />
  </div>

  <a href="#about" className="scroll-hint">
    <span>&#8595;</span>
  </a>
</section>

      {/* About Snippet */}
      <section id="about" className="about-snippet">
  <div className="hero-content">
    <h1 className="hero-title">The Moody Brewer</h1>
    <p className="hero-subtitle">Where every sip tells a story.</p>
    <a href="/menu" className="hero-button">Explore the Menu</a>
  </div>

  <h2 className="snippet-title">Crafted with Soul</h2>
  <p className="snippet-text">
    At The Moody Brewer, we blend passion and flavor to create moments worth savoring.
    Whether you're sipping a lavender lemonade or warming up with a tiramisu latte,
    our drinks are designed to match your mood.
  </p>
</section>


      {/* Featured Items */}
      <section className="section featured">
        <h2 className="section-heading">Featured Drinks</h2>
        <div className="features">
          <div className="feature-card">
            <img src="/assets/images/menu/strawberry_latte.png" alt="Dubai Chocolate Strawberry Latte" />
            <div className="feature-info">
              <h3>Dubai Chocolate Strawberry</h3>
              <p>Rich, sweet, and luxurious—just like its name.</p>
            </div>
          </div>
          <div className="feature-card">
            <img src="/assets/images/menu/tiramisu-oats.png" alt="Tiramisu Overnight Oats" />
            <div className="feature-info">
              <h3>Tiramisu Overnight Oats</h3>
              <p>Deliciously creamy with a caffeine kick.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="section review-section">
        <div className="review-form">
          <h2 className="section-heading">Leave a Review</h2>
          <form onSubmit={handleSubmit}>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <i
                  key={star}
                  className={`fa-${selectedRating >= star ? 'solid' : 'regular'} fa-star star`}
                  onClick={() => handleStarClick(star)}
                ></i>
              ))}
            </div>
            <input type="text" name="reviewName" placeholder="Your Name" required />
            <textarea name="reviewText" placeholder="Share your experience..." required></textarea>
            <button type="submit">Submit Review</button>
            {successVisible && <div className="success-message show">🎉 Thank you for your feedback!</div>}
            {warningVisible && <div className="warning-message show">⚠️ You already submitted a review this session.</div>}
          </form>
        </div>
      </section>

      <footer className="home-footer">
  <p>© 2025 The Moody Brewer | Crafted with ❤️ in Rhode Island</p>
  <p className="footer-credit">
    Website by <a href="https://volatile-solutions.netlify.app/" target="_blank" rel="noopener noreferrer">Volatile | Solutions</a>
  </p>
</footer>

    </div>
  );
};

export default Home;
