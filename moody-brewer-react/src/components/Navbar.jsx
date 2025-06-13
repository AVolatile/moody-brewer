import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setOpen(prev => !prev);
  const closeMenu = () => setOpen(false);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo" onClick={() => { closeMenu(); navigate('/'); }}>
        <img src="/assets/images/mb_logo.png" alt="The Moody Brewer Logo" />
        <span>The Moody Brewer</span>
      </div>

      <div className={`hamburger ${open ? 'open' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`nav-links ${open ? 'active' : ''}`}>
        <a onClick={closeMenu} href="/">Home</a>
        <a onClick={closeMenu} href="/menu">Menu</a>
        <a onClick={closeMenu} href="/about">About</a>
        <a onClick={closeMenu} href="/visit">Visit Us</a>
        <a onClick={closeMenu} href="/contact">Contact</a>
        <a onClick={closeMenu} href="/reviews">Reviews</a>
      </div>
    </nav>
  );
};

export default Navbar;
