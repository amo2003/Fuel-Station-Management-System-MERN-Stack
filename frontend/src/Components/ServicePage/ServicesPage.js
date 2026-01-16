import React from 'react';
import { Link } from 'react-router-dom';
import './ServicePage.css';
import logo from '../../assets/f2.png'; // Top logo

function ServicesPage() {
  return (
    <>
      {/* NAVIGATION BAR */}
      <nav className="main-nav">
        <div className="nav-container">
          <div className="nav-logo">
            <Link to="/">Dasu Filling Station, Galle</Link>
          </div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/fuel-prices">Fuel Prices</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </nav>

      {/* BACKGROUND & LOGO */}
      <div className="services-background">
        <div className="services-logo">
          <img src={logo} alt="Dasu Logo" />
        </div>

        {/* SERVICE CONTENT */}
        <div className="services-page">
          <h1>Our Services at Dasu Fuel Station</h1>
          <p>Providing premium and comprehensive fuel station services to all our customers.</p>
          
          <div className="services-list">
            <div className="service-card">
              <h2> Fuel Pumps</h2>
              <p>Fast and efficient refueling with modern pumps for petrol and diesel vehicles.</p>
            </div>

            <div className="service-card">
              <h2>Large Quantity Fuel Sale</h2>
              <p>Specialized service for commercial vehicles and bulk fuel requirements with competitive pricing.</p>
            </div>

            <div className="service-card">
              <h2> EV Charging Facilities</h2>
              <p>Electric vehicle charging stations equipped with fast chargers to keep you moving.</p>
            </div>

            <div className="service-card">
              <h2> Clean Toilets</h2>
              <p>Well-maintained restroom facilities available 24/7 for customer convenience.</p>
            </div>

            <div className="service-card">
              <h2> Refreshment Corner</h2>
              <p>Enjoy coffee, snacks, and refreshments while you wait.</p>
            </div>

            <div className="service-card">
              <h2> Vehicle Maintenance</h2>
              <p>Basic vehicle maintenance and oil change services available onsite.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServicesPage;
