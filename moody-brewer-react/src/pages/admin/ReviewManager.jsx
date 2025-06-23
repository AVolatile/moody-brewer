import React, { useEffect, useState } from 'react';
import '../Admin.css';

const ReviewManager = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reviews from backend
  const fetchReviews = async () => {
    try {
      const res = await fetch("https://moody-brewer.onrender.com/api/reviews");
      const data = await res.json();
      setReviews(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  // Delete a review
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this review?");
    if (!confirm) return;

    try {
      const res = await fetch(`https://moody-brewer.onrender.com/api/reviews/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setReviews(reviews.filter(review => review._id !== id));
      } else {
        console.error("Failed to delete review");
      }
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="admin-section">
      <h2>Manage Reviews</h2>

      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <div className="admin-reviews">
          {reviews.slice(0).reverse().map((review) => (
            <div key={review._id} className="admin-review-card">
              <h3>{review.name}</h3>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`fa-star fa-${i < review.stars ? 'solid' : 'regular'}`}
                  />
                ))}
              </div>
              <p>{review.message}</p>
              <button
                className="delete-btn"
                onClick={() => handleDelete(review._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewManager;
