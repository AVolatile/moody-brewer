import React from 'react';
import './Contact.css';
import Navbar from '../components/Navbar';

const Contact = () => {
  return (
    <div className="contact-page">
      <video autoPlay muted loop playsInline className="video-bg">
        <source src="/assets/videos/ig-reel-3.mp4" type="video/mp4" />
      </video>
      <div className="video-overlay"></div>

      <Navbar />

      <main className="contact-content">
        <div className="contact-box">
          <h1 className="contact-title">Let’s Talk</h1>
          <p className="contact-subtext">
            Questions? Ideas? A story to share? We'd love to hear from you.
          </p>

          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <input type="text" name="name" placeholder="Name" required />
            <input type="email" name="email" placeholder="Email" required />
            <textarea name="message" rows="5" placeholder="Your message..." required />
            <button type="submit">Send</button>
          </form>

          <div className="contact-details">
            <p><span>Email:</span> hello@themoodybrewer.com</p>
            <p><span>Phone:</span> (401) 555-0123</p>
            <p><span>Address:</span> 123 Brew Lane, Providence, RI</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
