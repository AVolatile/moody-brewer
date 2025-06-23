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

      {/* Seasonal Feature */}
      {/* <section className="section seasonal-highlight">
        <h2 className="section-heading">This Month’s Mood</h2>
        <p className="section-subtext">Iced Honey Rose Latte — smooth, floral, and made for June afternoons.</p>
        <a href="/menu" className="hero-button">Try it before it's gone</a>
      </section> */}

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
      <section id="about" className="about-snippet updated-layout">
        <div className="about-container">
          <div className="about-text">
            <h1 className="hero-title">The Moody Brewer</h1>
            <p className="hero-subtitle">Where every sip tells a story.</p>
            <p className="snippet-text">
              At The Moody Brewer, we blend passion and flavor to create moments worth savoring. Whether you're sipping a lavender lemonade or warming up with a tiramisu latte, our drinks are designed to match your mood.
            </p>
            <a href="/menu" className="hero-button">Explore the Menu</a>
          </div>
          <div className="about-image-frame">
            <img src="/assets/images/menu/tiramisu_latte.png" alt="Moody Drink" />
          </div>
        </div>
      </section>

      {/* Photo Moodboard */}
      <section className="section moodboard">
        <h2 className="section-heading">Inside The Moody Brewer</h2>
        <div className="carousel-container">
          <button className="carousel-btn left" onClick={() => scrollCarousel(-1)}>‹</button>
          <div className="carousel-track" id="carousel">
            <img src="/assets/images/menu/lavander_lemonade.png" alt="Lavender Lemonade" />
            <img src="/assets/images/menu/strawberry_latte.png" alt="Strawberry Latte" />
            <img src="/assets/images/menu/tiramisu_latte.png" alt="Tiramisu Latte" />
            <img src="/assets/images/menu/turmeric_latte.png" alt="Turmeric Latte" />
            <img src="/assets/images/menu/dubai_latte.png" alt="Dubai Latte" />
          </div>
          <button className="carousel-btn right" onClick={() => scrollCarousel(1)}>›</button>
        </div>
      </section>

      {/* Featured Drinks */}
      <section className="section featured">
        <h2 className="section-heading">Featured Drinks</h2>
        <p className="section-subtext">Fan favorites our customers can’t stop talking about.</p>
        <div className="features">
          <div className="feature-card">
            <img src="/assets/images/menu/strawberry_latte.png" alt="Strawberry Latte" />
            <div className="feature-info">
              <h3>Dubai Chocolate Strawberry</h3>
              <p>Rich, sweet, and luxurious—just like its name.</p>
            </div>
          </div>
          <div className="feature-card">
            <img src="/assets/images/menu/tiramisu_latte.png" alt="Tiramisu Latte" />
            <div className="feature-info">
              <h3>Tiramisu Latte</h3>
              <p>Deliciously creamy with a caffeine kick.</p>
            </div>
          </div>
          <div className="feature-card">
            <img src="/assets/images/menu/turmeric_latte.png" alt="Turmeric Latte" />
            <div className="feature-info">
              <h3>Golden Turmeric Latte</h3>
              <p>Earthy, spiced, and packed with warmth.</p>
            </div>
          </div>
          <div className="feature-card">
            <img src="/assets/images/menu/parfait_cup.png" alt="Parfait Cup" />
            <div className="feature-info">
              <h3>Berry Yogurt Parfait</h3>
              <p>Bright berries layered with creamy Greek yogurt.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Bites */}
      <section className="section featured">
        <h2 className="section-heading">Signature Bites</h2>
        <p className="section-subtext">Made fresh, served with flair.</p>
        <div className="features">
          <div className="feature-card">
            <img src="/assets/images/menu/breaded_chicken_sandwich.png" alt="Breaded Chicken Sandwich" />
            <div className="feature-info">
              <h3>Breaded Chicken Sandwich</h3>
              <p>Crispy, juicy, and stacked with flavor.</p>
            </div>
          </div>
          <div className="feature-card">
            <img src="/assets/images/menu/chicken_and_egg_roll.png" alt="Chicken and Egg Roll" />
            <div className="feature-info">
              <h3>Chicken & Egg Roll</h3>
              <p>Classic combo, rolled up just right.</p>
            </div>
          </div>
          <div className="feature-card">
            <img src="/assets/images/menu/pesto_panini.png" alt="Pesto Panini" />
            <div className="feature-info">
              <h3>Pesto Panini</h3>
              <p>Fresh basil pesto on toasted artisan bread.</p>
            </div>
          </div>
          <div className="feature-card">
            <img src="/assets/images/menu/prosciutto_panini.png" alt="Prosciutto Panini" />
            <div className="feature-info">
              <h3>Prosciutto Panini</h3>
              <p>Italian cured ham meets gourmet cheese.</p>
            </div>
          </div>
          <div className="feature-card">
            <img src="/assets/images/menu/turkey_bacon_panini.png" alt="Turkey Bacon Panini" />
            <div className="feature-info">
              <h3>Turkey Bacon Panini</h3>
              <p>Lean turkey, crispy bacon, toasty goodness.</p>
            </div>
          </div>
          <div className="feature-card">
            <img src="/assets/images/menu/pesto_pasta_salad.png" alt="Pesto Pasta Salad" />
            <div className="feature-info">
              <h3>Pesto Pasta Salad</h3>
              <p>Herby, chilled, and perfect for summer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quotes Carousel */}
      <section className="section quotes-carousel">
        <h2 className="section-heading">Words From Our Community</h2>
        <div className="quote-box">
          <p>“Best oat milk latte I’ve had in Rhode Island.”</p>
          <p>“This place feels like a warm hug in a cup.”</p>
          <p>“Come for the coffee, stay for the vibe.”</p>
        </div>
      </section>

      {/* Loyalty CTA */}
      <section className="section loyalty-cta">
        <h2 className="section-heading">Sip More. Earn More.</h2>
        <p className="section-subtext">Ask about our in-store loyalty program and start collecting rewards.</p>
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
