import { useState } from 'react';
import './HomeNav.css';
import { FaGasPump } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function HomeNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fuel-navbar">
      <div className="navbar-logo">
        <FaGasPump size={22} />
        <span className="logo-text">Dasu Filling <span className="logo-flow">Station, Galle.</span></span>
      </div>

      {/* Desktop links */}
      <ul className="navbar-links desktop-links">
        <li><Link to="/fuel-levels">Live Fuel Level</Link></li>
        <li><Link to="/evlog">Charge Your EV</Link></li>
        <li><Link to="/flogin">Place Fuel Order</Link></li>
        <li><Link to="/memberlogin">Staff Details</Link></li>
        <li><Link to="/feedback">Feedback</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>

      {/* Hamburger button - mobile only */}
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <ul className="mobile-menu" onClick={() => setMenuOpen(false)}>
          <li><Link to="/fuel-levels">Live Fuel Level</Link></li>
          <li><Link to="/evlog">Charge Your EV</Link></li>
          <li><Link to="/flogin">Place Fuel Order</Link></li>
          <li><Link to="/memberlogin">Staff Details</Link></li>
          <li><Link to="/feedback">Feedback</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
      )}
    </nav>
  );
}

export default HomeNav;
