import React, { useEffect, useState } from 'react';
import '../Admin.css';
import ConfirmModal from '../../components/ConfirmModal';

const MenuManager = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });

  const [confirmId, setConfirmId] = useState(null); // 🔑 Modal control

  // Fetch existing menu
  const fetchMenu = async () => {
    try {
      const res = await fetch("https://moody-brewer.onrender.com/api/menu");
      const data = await res.json();
      setMenuItems(data);
    } catch (err) {
      console.error("Error fetching menu:", err);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://moody-brewer.onrender.com/api/menu", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });

      if (res.ok) {
        setNewItem({ name: '', description: '', price: '', category: '' });
        fetchMenu();
      } else {
        console.error("Failed to add menu item");
      }
    } catch (err) {
      console.error("Error adding menu item:", err);
    }
  };

  const handleDelete = (id) => {
    setConfirmId(id); // opens modal
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`https://moody-brewer.onrender.com/api/menu/${confirmId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setMenuItems(menuItems.filter(item => item._id !== confirmId));
      } else {
        console.error("Failed to delete item");
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
    setConfirmId(null); // closes modal
  };

  return (
    <div className="admin-section">
      <h2>Manage Menu</h2>

      <form className="menu-form" onSubmit={handleAddItem}>
        <input name="name" value={newItem.name} onChange={handleChange} placeholder="Name" required />
        <input name="description" value={newItem.description} onChange={handleChange} placeholder="Description" required />
        <input name="price" value={newItem.price} onChange={handleChange} placeholder="Price" required />
        <input name="category" value={newItem.category} onChange={handleChange} placeholder="Category (e.g., Latte, Food)" />
        <button type="submit">Add Item</button>
      </form>

      <div className="admin-menu-list">
        {menuItems.map(item => (
          <div key={item._id} className="menu-card">
            <div>
              <h3>{item.name}</h3>
              <p className="category">{item.category}</p>
              <p>{item.description}</p>
              <p className="price">${parseFloat(item.price).toFixed(2)}</p>
            </div>
            <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* 🔥 Modal rendering */}
      {confirmId && (
        <ConfirmModal
          message="Are you sure you want to delete this menu item?"
          onConfirm={confirmDelete}
          onCancel={() => setConfirmId(null)}
        />
      )}
    </div>
  );
};

export default MenuManager;
