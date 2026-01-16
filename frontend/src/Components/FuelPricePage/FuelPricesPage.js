import React from 'react';
import { Link } from 'react-router-dom';
import './FuelPricesPage.css';
import logo from '../../assets/f2.png';

function FuelPricesPage() {
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

      <div className="fuel-prices-background">
        <div className="fuel-logo">
          <img src={logo} alt="Dasu Logo" />
        </div>

        <div className="fuel-prices-page">
          <h1>Current Fuel Prices at Dasu Filling Station, Galle.</h1>
          <p>We update our prices regularly to provide the best value to our customers.</p>

          <table className="prices-table">
            <thead>
              <tr>
                <th>Fuel Type</th>
                <th>Price per Liter (LKR)</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Petrol 92</td>
                <td>305.00</td>
                <td>Available 24/7</td>
              </tr>
               <tr>
                <td>Petrol 95</td>
                <td>355.00</td>
                <td>Available 24/7</td>
              </tr>
              <tr>
                <td>Diesel</td>
                <td>341.00</td>
                <td>Discount for bulk purchases</td>
              </tr>
              <tr>
                <td>Auto Diesel</td>
                <td>289.00</td>
                <td>Safe and clean energy option</td>
              </tr>
               <tr>
                <td>Kerosene</td>
                <td>225.00</td>
                <td>Available 24/7</td>
              </tr>
              <tr>
                <td>EV Charging</td>
                <td>50.00 / kWh</td>
                <td>Fast charging available</td>
              </tr>
            </tbody>
          </table>

          <section className="additional-info">
            <h2>Additional Information</h2>
            <ul>
              <li>Prices are subject to change based on government policies.</li>
              <li>Special discounts available for corporate clients and fleet services.</li>
              <li>Contact our support team for bulk orders and contracts.</li>
              <li>We prioritize environmentally friendly practices across our operations.</li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}

export default FuelPricesPage;
