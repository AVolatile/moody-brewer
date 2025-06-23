import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Reviews from './pages/Reviews';
import Visit from './pages/Visit';
import Menu from './pages/Menu';
import About from './pages/About';      
import Contact from './pages/Contact';  
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/visit" element={<Visit />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Reviews" element={<Reviews />} />
        <Route path="/admin" element={<AdminDashboard />} />


      </Routes>
    </Router>
  );
}

export default App;
