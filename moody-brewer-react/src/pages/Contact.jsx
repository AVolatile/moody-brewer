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
        <h1>Contact Us</h1>
        <p className="intro">Have questions, suggestions, or just want to say hello? Drop us a line!</p>

        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required />
          <button type="submit">Send Message</button>
        </form>

        <div className="contact-info">
          <p><strong>Email:</strong> hello@themoodybrewer.com</p>
          <p><strong>Phone:</strong> (401) 555-0123</p>
          <p><strong>Address:</strong> 123 Brew Lane, Providence, RI</p>
        </div>
      </main>
    </div>
  );
};

export default Contact;
