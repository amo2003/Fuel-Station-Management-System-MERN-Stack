import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './AddStock.css';
import logo from '../../assets/f2.png';

function AddStock() {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState({
    date: "",
    type: "",
    quantity: "",
    supplier: "",
  });

  const handleChange = (e) => {
    setStocks(prev => ({
      ...prev,
      [e.target.name]: e.target.value.trimStart(), // prevent leading spaces
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/stocks", stocks);
      const stockId = res.data.stock._id;
      if (!stockId) throw new Error("No stock ID returned");
      alert("Stock added successfully");
      navigate(`/displaystock/${stockId}`);
    } catch (err) {
      alert("Error adding stock. Please check console for details.");
      console.error(err);
    }
  };

  return (
    <div className="addfuelstaff-page">
      <nav className="addfuelstaff-navbar">
        <Link to="/" className="nav-logo">FuelFlow Station, Galle.</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/displaymember">Staff List</Link>
          <Link to="/logout">Logout</Link>
        </div>
      </nav>

      <div className="addfuelstaff-container">
        <div className="form-header">
          <img src={logo} alt="Dasu Filling Station Logo" className="station-logo" />
          <h1 className="addfuelstaff-title">Dasu Filling Station, Galle.</h1>
          <h2 className="addfuelstaff-subtitle">Add Fuel Stock Entry</h2>
        </div>

        <form onSubmit={handleSubmit} className="addfuelstaff-form">
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              onChange={handleChange}
              value={stocks.date}
              required
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Fuel Type:</label>
            <select
              id="type"
              name="type"
              onChange={handleChange}
              value={stocks.type}
              required
            >
              <option value="">-- Select Fuel Type --</option>
              <option value="Gasoline">Gasoline</option>
              <option value="Diesel">Diesel</option>
              <option value="Kerosene">Kerosene</option>
              <option value="Petrol 92">Petrol 92</option>
              <option value="Petrol 95">Petrol 95</option>
              <option value="Auto Diesel">Auto Diesel</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Quantity (Liters):</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              onChange={handleChange}
              value={stocks.quantity}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="supplier">Supplier:</label>
            <input
              type="text"
              id="supplier"
              name="supplier"
              onChange={handleChange}
              value={stocks.supplier}
              required
              autoComplete="off"
            />
          </div>

          <button type="submit" className="submit-btn">Add Stock</button>
        </form>
      </div>
    </div>
  );
}

export default AddStock;
