import React from "react";
import { Button } from "pixel-retroui";

const Navbar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Menu</h2>
      <nav className="nav-links">
        <a href="/" className="nav-item">🏠 Home</a>
        <a href="/events" className="nav-item">📅 Events</a>
        <a href="/about" className="nav-item">ℹ️ About Me</a>
      </nav>
    </div>
  );
};

export default Navbar;
