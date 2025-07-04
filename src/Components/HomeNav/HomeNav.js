// src/components/HomeNav/HomeNav.js
import React from 'react';
import './HomeNav.css';
import { FaGasPump, FaWhatsapp  } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function HomeNav() {

   //whasapp----
   const handleSendReport = () => {
    //crete whatsapp chat url
    const phoneNumber = "+94766773745";
    const message = `Hello what you want to know`
    const WhatsAppUrl = `http://web.whatsapp.com/send?phones=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
    
    //open the whatsapp chat in new window
    window.open(WhatsAppUrl,"_blank");
  }

  return (
    <nav className="fuel-navbar">
      <div className="navbar-logo">
        <FaGasPump size={24} />
        <span className="logo-text">Dasu Filling <span className="logo-flow">Station, Galle.</span></span>
      </div>
      <ul className="navbar-links">
      { <li><Link to="/admin">Dashboard</Link></li> }
        <li><Link to="/fuel-Levels">Inventory</Link></li>
        <li><Link to="/sales">Sales</Link></li>
        <li><Link to="/memberlogin">Add Staff</Link></li>
        <li><Link to="/displaymember">Reports</Link></li>
        <li><Link to="/contact">Contact</Link></li>

      </ul>

      <div className="whatsapp-btn-container">
  <button className="whatsapp-btn" onClick={handleSendReport}>
    <FaWhatsapp className="whatsapp-icon" />
    WhatsApp Support
  </button>
</div>

    </nav>
  );
}

export default HomeNav;
