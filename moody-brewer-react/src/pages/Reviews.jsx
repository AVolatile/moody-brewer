import React, { useEffect, useState } from 'react';
import './Reviews.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; // ✅ Import shared Navbar

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState('all');
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReviews();
  }, [filter]);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/reviews");
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  };

  const filteredReviews = filter === 'all'
    ? reviews
    : reviews.filter(r => r.stars == filter);

  const averageRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + Number(r.stars), 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <>
      <Navbar />

      <main className={`section reviews-page ${fadeIn ? 'fade-in' : ''}`}>
        <div className="reviews-container">
          <div className="home-button" onClick={() => navigate('/')}>
            <img
              src="/assets/images/moody-logo-thin.png"
              alt="The Moody Brewer Logo"
              className="home-logo large"
            />
          </div>

          <h1 className="page-title">What Our Customers Are Saying</h1>

          <div className="average-rating">
            <span className="average-label">Average Rating</span>
            <div className="stars-display">
              {[...Array(5)].map((_, i) => (
                <i
                  key={i}
                  className={`fa-star fa-${i < Math.round(averageRating) ? 'solid' : 'regular'}`}
                />
              ))}
              <span className="avg-number">{averageRating}</span>
            </div>
          </div>

          <div className="filter-container">
            <label htmlFor="ratingFilter">Filter by Rating:</label>
            <select
              id="ratingFilter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>

          <div className="review-grid">
            {filteredReviews.slice(0).reverse().map(({ name, message, stars }, idx) => (
              <div key={idx} className="review-card">
                <h3 className="reviewer-name">{name}</h3>
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fa-star fa-${i < stars ? 'solid' : 'regular'}`}></i>
                  ))}
                </div>
                <p className="review-message">{message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* <section className="promo-section blog-style fade-overlay">
          <div className="social-card fade-overlay">
            <div className="social-header">
              <img src="/assets/images/main_logo.png" alt="Moody Brewer" className="profile-pic" />
              <div>
                <h4 className="profile-name">The Moody Brewer</h4>
                <span className="post-time">5h ago</span>
              </div>
            </div>
            <video className="video-post" autoPlay muted loop>
              <source src="/assets/videos/ig-reel-1.mp4" type="video/mp4" />
            </video>
            <div className="post-caption">Stop in for a sip 🍷✨</div>
            <div className="post-actions">
              <img src="/assets/icons/like.png" alt="Like" className="icon" />
              <img src="/assets/icons/comment.png" alt="Comment" className="icon" />
            </div>
          </div>
        </section> */}
      </main>
    </>
  );
};

export default Reviews;
