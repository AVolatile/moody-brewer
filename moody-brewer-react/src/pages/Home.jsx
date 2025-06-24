import React, { useState } from 'react';
import './Home.css';
import confetti from 'canvas-confetti';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
      if (sessionStorage.getItem('hasReviewed')) {
        setWarningVisible(true);
        return;
      }

      try {
        const response = await fetch('https://moody-brewer.onrender.com/api/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, message, stars: selectedRating }),
        });

        if (response.ok) {
          e.target.reset();
          setSelectedRating(0);
          setSuccessVisible(true);
          confetti();
          sessionStorage.setItem('hasReviewed', true);
          setTimeout(() => setSuccessVisible(false), 3000);
        }
      } catch (err) {
        console.error('Failed to submit review:', err);
      }
    }
  };

  const scrollCarousel = (direction) => {
    const track = document.getElementById('carousel');
    const scrollAmount = 300;
    track.scrollBy({ left: scrollAmount * direction, behavior: 'smooth' });
  };

  const [liked, setLiked] = useState(() => {
  return localStorage.getItem('cheersLiked') === 'true';
});

const [likes, setLikes] = useState(() => {
  return parseInt(localStorage.getItem('cheersLikes')) || 201;
});

const toggleLike = () => {
  const newLiked = !liked;
  const newCount = newLiked ? likes + 1 : likes - 1;

  setLiked(newLiked);
  setLikes(newCount);
  localStorage.setItem('cheersLiked', newLiked);
  localStorage.setItem('cheersLikes', newCount);
};


  return (
    <div className="home-page">
      <div className="video-bg">
        <video className="bg-video active" autoPlay muted loop playsInline>
          <source src="/assets/videos/ig-reel-1.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <Navbar />

      <section className="hero">
        <div className="hero-logo">
          <img src="/assets/images/mb_logo.png" alt="The Moody Brewer Logo" className="hero-logo-img" />
        </div>
        <a href="#about" className="scroll-hint">
          <i className="fa-solid fa-chevron-down"></i>
        </a>
      </section>

{/* Customer Cheers Banner */}
<section className="cheers-banner">
  <div className="cheers-banner-inner">
    <h2 className="section-heading">The Moody Moment</h2>
    <p className="section-subtext">Too good not to share.</p>

    <div className="social-post">
      {/* Header with logo and handle */}
      <div className="post-header">
        <img
          src="/assets/images/owner-hero.png"
          alt="Owner profile"
          className="post-avatar"
        />
        <a
          className="post-handle"
          href="https://www.instagram.com/them00dybrewer/"
          target="_blank"
          rel="noopener noreferrer"
          title="Visit our Instagram"
        >
          @them00dybrewer
        </a>
      </div>

      <hr className="post-divider" />

      {/* Post Image */}
      <img
        src="/assets/images/cheers_banner.png"
        alt="Cheers with drinks in front of The Moody Brewer"
        className="social-post-img"
      />

      {/* Post actions */}
      <div className="post-actions">
        <span className="like-button" onClick={() => toggleLike()}>
          <i className={`fa${liked ? 's' : 'r'} fa-heart`}></i>
          <span>{likes}</span>
        </span>
        <span className="comment-button" title="Comments coming soon!">
          <i className="far fa-comment"></i>
        </span>
      </div>

      {/* Social links */}
      <div className="social-caption">
        <a
          className="social-link"
          href="https://www.instagram.com/them00dybrewer/"
          target="_blank"
          rel="noopener noreferrer"
          title="Follow us on Instagram"
        >
          <i className="fab fa-instagram"></i>
          @them00dybrewer
        </a>
        <a
          className="social-link"
          href="https://www.facebook.com/people/The-Moody-Brewer/61569217047077/?_rdr"
          target="_blank"
          rel="noopener noreferrer"
          title="Find us on Facebook"
        >
          <i className="fab fa-facebook"></i>
          The Moody Brewer
        </a>
      </div>
    </div>
  </div>
</section>

{/* About Snippet */}
<section id="about" className="about-snippet improved-about">
  <div className="about-container">
    <div className="about-text">
      <h1 className="hero-title">The Moody Brewer</h1>
      <p className="hero-subtitle">Where every sip tells a story.</p>
      <p className="snippet-text">
        At The Moody Brewer, we blend passion and flavor to create moments worth savoring. Whether you're sipping a lavender lemonade or warming up with a tiramisu latte, our drinks are designed to match your mood.
      </p>
      <a href="/menu" className="hero-button">Explore the Menu</a>
    </div>
    <div className="about-image-collage">
  <img src="/assets/images/coffee_bagel.png" alt="Still" className="collage-img img1" />
  <img src="/assets/images/family_fun.png" alt="Family" className="collage-img img2" />
  <img src="/assets/images/owner-hero.png" alt="Owner" className="collage-img img3" />
</div>
  </div>
</section>

      {/* Review Form */}
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

      <Footer />
    </div>
  );
};

export default Home;
