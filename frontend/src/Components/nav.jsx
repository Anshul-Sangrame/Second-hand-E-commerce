import React from "react";
import "./Style/nav.css";
import { Outlet } from "react-router-dom";
function Navbar() {
  return (
    <div className="nav-flex">
      <nav className="nav-bar">
        <div className="navlogo">OLX</div>
        <div className="navprofile">Profile</div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button type="submit">Search for the items </button>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default Navbar;
