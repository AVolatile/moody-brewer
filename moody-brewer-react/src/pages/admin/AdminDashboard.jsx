import React from 'react';
import ReviewManager from './ReviewManager';
import MenuManager from './MenuManager';
import '../Admin.css';
import ConfirmModal from '../../components/ConfirmModal';


const AdminDashboard = () => {
  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>The Moody Brewer Admin Panel</h1>
        <p>Welcome back! Manage reviews and your menu below.</p>
      </header>

      <section className="admin-section">
        <h2>Customer Reviews</h2>
        <ReviewManager />
      </section>

      <section className="admin-section">
        <h2>Menu Management</h2>
        <MenuManager />
      </section>

      <footer className="admin-footer">
        <p>© 2025 The Moody Brewer | Admin Panel by <a href="https://yourportfolio.com" target="_blank" rel="noreferrer">Volatile | Solutions</a></p>
      </footer>
    </div>
  );
};

export default AdminDashboard;
