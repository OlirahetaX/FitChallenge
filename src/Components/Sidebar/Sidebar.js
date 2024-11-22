import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="custom-sidebar">
      <div className="hamburger">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <button className="add-button">
        <span className="plus-icon">+</span>
      </button>

      <nav className="menu-options">
        <div className="menu-item active">
          <i className="menu-icon">★</i>
          <span className="menu-label">Rutina</span>
        </div>
        <div className="menu-item">
          <i className="menu-icon">★</i>
          <span className="menu-label">Retos</span>
        </div>
        <div className="menu-item">
          <i className="menu-icon">★</i>
          <span className="menu-label">Información</span>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;