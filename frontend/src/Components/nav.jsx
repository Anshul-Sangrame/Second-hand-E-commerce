import React from "react";
import "./nav.css";
import cart from "./cart.png";
function Navbar() {
  return (
    <nav>
      <div className="navlogo">OLX</div>
      <div className="navprofile">Profile</div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button type="submit">Search for the items </button>
      
      </div>
    </nav>
  );
}

export default Navbar;
