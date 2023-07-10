import React, { useState } from "react";
import "./Style/nav.css";
import { Outlet } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
function Navbar() {
  const [showSB, setShowSB] = useState(false);
  const [clr,setClr] = useState("white");

  const handleClick = () => {
    setShowSB(!showSB);
    setClr(!showSB? "orange":"");
  }

  return (
    <div className="nav-flex">
      <nav className="nav-bar">
        <div className="navlogo" style={{color:clr}} onClick={handleClick}><FontAwesomeIcon icon={faBars} /></div>
        {/* <div className="navprofile">Profile</div> */}
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button type="submit">Search for the items </button>
        </div>
      </nav>
      <Outlet context={showSB}/>
    </div>
  );
}

export default Navbar;
