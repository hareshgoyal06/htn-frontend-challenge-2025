import React, { useState } from "react";
import AboutMePopup from "./AboutMe"; // Import your popup component

const Navbar = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <>
      {/* Sidebar/Navbar */}
      <div className="sidebar">
        <h2 className="sidebar-title">Menu</h2>
        <nav className="nav-links">
          <a href="/home" className="nav-item">
            🏠
          </a>
          <a href="/" className="nav-item">
            📅
          </a>
          <button
            onClick={() => setIsAboutOpen(true)}
            className="nav-item focus:outline-none"
          >
            ℹ️
          </button>
        </nav>
      </div>

      {/* About Me Popup - Controlled by State */}
      {isAboutOpen && <AboutMePopup onClose={() => setIsAboutOpen(false)} />}
    </>
  );
};

export default Navbar;
