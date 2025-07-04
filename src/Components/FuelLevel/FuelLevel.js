import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // ✅ Needed for navigation links
import './FuelLevel.css';
import logo from '../../assets/f2.png';

function FuelLevels() {
  const [levels, setLevels] = useState([]);
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    const fetchFuelLevels = async () => {
      try {
        const res = await axios.get("http://localhost:5000/stocks/fuelLevels");
        console.log("✅ Fuel level API response:", res.data);
        setLevels(res.data.storage);

        const today = new Date().toLocaleDateString();
        setLastUpdated(today);
      } catch (err) {
        console.error("❌ Error fetching fuel levels:", err);
      }
    };

    fetchFuelLevels();
  }, []);

  return (
    <div className="fuel-levels-page">

      {/* ✅ Top Navigation Bar - Only for this page */}
      <nav className="fuel-navbar">
        <div className="navbar-left">
          <Link to="/" className="nav-brand">Dasu Filling Station</Link>
        </div>
        <div className="navbar-right">
          <Link to="/">Home</Link>
          <Link to="/addstock">Add Stock</Link>
          <Link to="/logout">Logout</Link>
        </div>
      </nav>

      {/* ✅ Centered Logo */}
      <div className="logo-header">
        <img src={logo} alt="Station Logo" className="station-logo" />
      </div>

      {/* ✅ Page Title and Last Updated */}
      <h2 className="page-title">⛽ Current Fuel Storage Overview</h2>
      <p className="last-updated">📅 Last Updated: {lastUpdated}</p>

      {/* ✅ Fuel Tank Cards */}
      {levels.length === 0 ? (
        <p className="no-data">⚠️ No fuel data available.</p>
      ) : (
        <div className="horizontal-tank-container">
          {levels.map((item) => {
            const quantity = Number(item.quantity);
            const maxCapacity = 50000;
            const percentage = Math.min((quantity / maxCapacity) * 100, 100);

            let color = '#27ae60'; // green
            let status = 'Healthy';

            if (percentage <= 25) {
              color = '#f39c12'; // orange
              status = 'Low';
            }
            if (percentage <= 10) {
              color = '#e74c3c'; // red
              status = 'Critical';
            }

            return (
              <div className="horizontal-tank-card" key={item._id}>
                <div className="tank-label">
                  <h3>{item.type}</h3>
                  <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>
                </div>

                <div className="horizontal-tank">
                  <div
                    className="fill"
                    style={{
                      width: `${percentage}%`,
                      background: color,
                    }}
                  >
                    <span className="quantity-text">{quantity}L</span>
                  </div>
                </div>

                <p className="capacity-info">
                  Capacity: {quantity}L / 50000L ({Math.round(percentage)}%)
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FuelLevels;
