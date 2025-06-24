import React, { useEffect, useState } from 'react';
import './Menu.css';
import Navbar from '../components/Navbar';

const menuItems = {
  Drinks: [
    {
      title: "Lavender Lemonade",
      desc: "Refreshing citrus with a floral twist.",
      price: "$4.25",
      image: "/assets/images/menu/lavender_lemonade.png"
    },
    {
      title: "Strawberry Iced Latte",
      desc: "Chilled espresso with sweet strawberry cream.",
      price: "$5.00",
      image: "/assets/images/menu/strawberry_latte.png"
    },
    {
      title: "Tiramisu Latte",
      desc: "Espresso infused with rich mascarpone and cocoa.",
      price: "$5.50",
      image: "/assets/images/menu/tiramisu_latte.png"
    }
  ],
  Foods: [
    {
      title: "Tiramisu Overnight Oats",
      desc: "Creamy oats layered with espresso and cocoa.",
      price: "$6.00",
      image: "/assets/images/menu/tiramisu-oats.png"
    },
    {
      title: "Avocado Toast",
      desc: "Multigrain toast topped with smashed avocado & seasonings.",
      price: "$5.25",
      image: "/assets/images/menu/avocado-toast.png"
    }
  ],
  Sides: [
    {
      title: "Banana Bread Slice",
      desc: "Homemade, moist, and served warm.",
      price: "$2.75",
      image: "/assets/images/menu/banana-bread.png"
    },
    {
      title: "Granola Bar",
      desc: "Nutty, chewy bar with cranberries & oats.",
      price: "$2.25",
      image: "/assets/images/menu/granola-bar.png"
    }
  ]
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const allItems = Object.values(menuItems).flat();
  const filteredItems = activeCategory === 'All' ? allItems : menuItems[activeCategory];

  return (
    <div className="menu-page">
      <div className="video-bg">
        <video className="bg-video active" autoPlay muted loop playsInline>
          <source src="/assets/videos/ig-reel-1.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <Navbar />

      <section className="section menu-section">
        <h1 className="section-heading animated-glow">Crafted with Soul</h1>
        <p className="section-subtitle">Explore our menu — infused with creativity and love.</p>

        <div className="category-filters">
          {['All', ...Object.keys(menuItems)].map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="menu-marquee">
          <marquee scrollamount="6">✨ New Arrivals • Hand-Crafted Brews • Locally Sourced ✨</marquee>
        </div>

        <div className="menu-grid">
          {filteredItems.map(({ title, desc, price, image }) => (
            <div key={title} className="menu-card animated-card">
              <div className="card-image-wrapper">
                <img src={image} alt={title} className="menu-image" />
                <div className="card-hover-text">Add to Favorites ❤️</div>
              </div>
              <div className="menu-content">
                <h3 className="item-title">{title}</h3>
                <p className="item-desc">{desc}</p>
                <span className="price">{price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="menu-footer">
        <p>© 2025 The Moody Brewer | Crafted with ❤️ in Rhode Island</p>
        <p className="footer-credit">
          Website by <a href="https://volatile-solutions.netlify.app/" target="_blank" rel="noopener noreferrer">Volatile | Solutions</a>
        </p>
      </footer>
    </div>
  );
};

export default Menu;
