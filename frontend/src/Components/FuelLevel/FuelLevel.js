import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './FuelLevel.css';
import logo from '../../assets/f2.png';

function FuelLevels() {
  const [levels, setLevels] = useState([]);
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    const fetchFuelLevels = async () => {
      try {
        const res = await axios.get("http://localhost:5000/stocks/fuelLevels");
        console.log("Fuel level API response:", res.data);
        setLevels(res.data.storage);
        const today = new Date().toLocaleDateString();
        setLastUpdated(today);
      } catch (err) {
        console.error("Error fetching fuel levels:", err);
      }
    };

    fetchFuelLevels();
  }, []);

  return (
    <div className="fuel-levels-page">

      {/* Navbar */}
      <nav className="fuel-navbar">
        <div className="navbar-left">
          <Link to="/" className="nav-brand">Dasu Filling Station</Link>
        </div>
        <div className="navbar-right">
          <Link to="/">Home</Link>
          <Link to="/">Logout</Link>
        </div>
      </nav>

      {/* Logo */}
      <div className="logo-header">
        <img src={logo} alt="Station Logo" className="station-logo" />
      </div>

      {/* Title */}
      <h2 className="level-page-title">⛽ Current Fuel Storage Overview</h2>
      <p className="last-updated">📅 Last Updated: {lastUpdated}</p>

      {/* Fuel Tanks */}
      {levels.length === 0 ? (
        <p className="no-data">No fuel data available.</p>
      ) : (
        <div className="tank-grid">
          {levels.map((item) => {
            const quantity = Number(item.quantity);
            const maxCapacity = 100000;
            const displayQuantity = Math.min(quantity, maxCapacity);
            const percentage = Math.min((quantity / maxCapacity) * 100, 100);

            let color = '#00b44bff';
            let status = 'Good';

            if (percentage <= 35) {
              color = '#f39c12';
              status = 'Low';
            }
            if (percentage <= 15) {
              color = '#e74c3c';
              status = 'Critical';
            }

            return (
              <div className="tank-card" key={item._id}>
                <div className="tank-label">
                  <h3>{item.type}</h3>
                  <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>
                </div>

                {/* Tank Visual */}
                <div className="tank-visual-container">
                  <div className="tank-visual">
                    <div
                      className="tank-fill"
                      style={{
                        height: `${percentage}%`,
                        background: color,
                      }}
                    >
                      <span className="tank-quantity">{displayQuantity}L</span>
                    </div>
                  </div>
                </div>

                {/* Capacity Info */}
                <p className="capacity-info">
                  Actual: {quantity}L / Capacity: 100000L ({Math.round((quantity / maxCapacity) * 100)}%)
                </p>

                {quantity > maxCapacity && (
                  <p className="overfill-warning">⚠️ Overfilled! Please reduce stock.</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FuelLevels;
