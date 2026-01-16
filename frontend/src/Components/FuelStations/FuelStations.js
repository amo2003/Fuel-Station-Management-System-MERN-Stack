import React from 'react';
import './FuelStations.css';
import logo from '../../assets/f2.png'; 
import { useNavigate } from 'react-router-dom';

function FuelStations() {


      const navigate = useNavigate();

return (
    <div className="stations-page">
      <header className="stations-header">
        <img src={logo} alt="Station-Logo" className="s" />
        <h1>Our Fuel Stations Across Sri Lanka</h1>
<div className="home-button-wrapper">
  <div className="st-home" onClick={() => navigate("/mainhome")}>Home</div>
</div>
        <p>We serve the nation with efficiency, safety, and trust.</p>
      </header>

      <section className="stations-grid">
        <div className="station-card">
          <h2>Colombo Main Station</h2>
          <p><strong>Address:</strong> 101 Galle Road, Colombo 03</p>
          <p><strong>Contact:</strong> 011-2556789</p>
          <p><strong>Facilities:</strong> Petrol, Diesel, EV Charging, Car Wash</p>
        </div>

        <div className="station-card">
          <h2>Kandy Central Station</h2>
          <p><strong>Address:</strong> 22 Peradeniya Road, Kandy</p>
          <p><strong>Contact:</strong> 081-2233445</p>
          <p><strong>Facilities:</strong> Petrol, Diesel, Mini Mart</p>
        </div>

        <div className="station-card">
          <h2>Jaffna Regional Station</h2>
          <p><strong>Address:</strong> 15 Temple Road, Jaffna</p>
          <p><strong>Contact:</strong> 021-4567890</p>
          <p><strong>Facilities:</strong> Petrol, Diesel, Lubricants</p>
        </div>

        <div className="station-card">
          <h2>Matara Southern Station</h2>
          <p><strong>Address:</strong> 8 Beach Road, Matara</p>
          <p><strong>Contact:</strong> 041-2225566</p>
          <p><strong>Facilities:</strong> Petrol, Diesel, Rest Area</p>
        </div>

        <div className="station-card">
          <h2>Anuradhapura Station</h2>
          <p><strong>Address:</strong> 90 Mihintale Road, Anuradhapura</p>
          <p><strong>Contact:</strong> 025-2224333</p>
          <p><strong>Facilities:</strong> Petrol, Diesel, Car Care</p>
        </div>
      </section>

      <footer className="stations-footer">
        <p>© 2025 Dasu Fuel Station Network. Serving Sri Lanka with pride.</p>
      </footer>
    </div>
  );
}

export default FuelStations;
