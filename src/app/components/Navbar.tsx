import React from "react";

const Navbar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Menu</h2>
      <nav className="nav-links">
        <a href="/home" className="nav-item">
          🏠
        </a>
        <a href="/" className="nav-item">
          📅
        </a>
        <a href="/about" className="nav-item">
          ℹ️
        </a>
      </nav>
    </div>
  );
};

export default Navbar;
