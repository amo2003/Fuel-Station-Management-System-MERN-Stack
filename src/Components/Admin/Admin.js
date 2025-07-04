import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';
import logo from '../../assets/f2.png';
import {
  FaGasPump,
  FaUsers,
  FaTruck,
  FaMoneyBill,
  FaCogs,
  FaFileInvoiceDollar,
  FaOilCan,
  FaWarehouse // ✅ New icon for stock display
} from 'react-icons/fa';

function Admin() {

    const stockId = localStorage.getItem("stockId"); // ✅ assuming stored at login

  return (
    <div className="admin-dashboard">
      <div className="admin-overlay"></div>

      <nav className="dashboard-nav">
        <div className="nav-logo-section">
          <img src={logo} alt="FuelFlow Logo" className="admin-logo" />
          <h2>FuelFlow Admin Panel</h2>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/logout">Logout</Link>
        </div>
      </nav>

      <div className="dashboard-content">
        <h1>Welcome, Admin</h1>
        <p className="dashboard-sub">Manage everything from one place</p>

        <div className="dashboard-cards">
          {/* Row 1 */}
          <div className="card-row">
            <Link  to="/addstock" className="card">
              <FaGasPump size={40} className="card-icon" />
              <h3>Add Fuel Stock</h3>
              <p>Monitor and update fuel inventory</p>
            </Link>

            <Link to={`/displaystock/${stockId}`} className="card"> {/* ✅ Stock Display Link */}
              <FaWarehouse size={40} className="card-icon" />
              <h3>Stock Records</h3>
              <p>View and manage fuel stock logs</p>
            </Link>

            <Link to="/displaymember" className="card">
              <FaUsers size={40} className="card-icon" />
              <h3>Manage Staff</h3>
              <p>View or modify staff records</p>
            </Link>
          </div>

          {/* Row 2 */}
          <div className="card-row">
            <Link to="/recordsale" className="card">
              <FaTruck size={40} className="card-icon" />
              <h3>Deliveries</h3>
              <p>Track fuel delivery schedules</p>
            </Link>

            <Link to="/sales" className="card">
              <FaFileInvoiceDollar size={40} className="card-icon" />
              <h3>Sales Records</h3>
              <p>Check and manage client payments</p>
            </Link>

            <Link to="/summary" className="card">
              <FaMoneyBill size={40} className="card-icon" />
              <h3>Income</h3>
              <p>Check and manage Income</p>
            </Link>
          </div>

          {/* Row 3 */}
          <div className="card-row">
            <Link to="/fuel-levels" className="card">
              <FaOilCan size={40} className="card-icon" />
              <h3>Fuel Levels</h3>
              <p>View current fuel tank status</p>
            </Link>

            <Link to="/admin-settings" className="card">
              <FaCogs size={40} className="card-icon" />
              <h3>Settings</h3>
              <p>Change password, manage profile</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
