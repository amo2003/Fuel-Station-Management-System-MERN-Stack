import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './StockDisplay.css';
import logo from '../../assets/f2.png';

function StockDisplay() {
  const [stocks, setStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/stocks');
        setStocks(res.data.stocks);
      } catch (err) {
        console.error('Failed to fetch stocks:', err);
      }
    };
    fetchStocks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this stock entry?")) {
      try {
        await axios.delete(`http://localhost:5000/stocks/${id}`);
        setStocks(stocks.filter(stock => stock._id !== id));
        alert('Stock deleted successfully');
      } catch (err) {
        console.error('Delete failed:', err);
        alert('Failed to delete stock');
      }
    }
  };

  const filteredStocks = stocks.filter(stock =>
    stock.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="stock-display-page">
      <nav className="stock-navbar">
        <div className="stock-logo">FuelFlow Station</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/addstock">Add Stock</Link>
          <Link to="/logout">Logout</Link>
        </div>
      </nav>

      <div className="stock-header">
        <img src={logo} alt="Logo" className="stock-logo-img" />
        <h2>Fuel Stock Records</h2>
      </div>

      <input
        type="text"
        className="stock-search"
        placeholder="Search by type or supplier..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="stock-table">
        {filteredStocks.map(stock => (
          <div key={stock._id} className="stock-card">
            <p className="highlight-date"><strong>Date:</strong> {new Date(stock.date).toLocaleDateString()}</p>
            <p><strong>Fuel Type:</strong> {stock.type}</p>
            <p><strong>Quantity:</strong> {stock.quantity} Liters</p>
            <p><strong>Supplier:</strong> {stock.supplier}</p>
            <div className="stock-actions">
              <button onClick={() => navigate(`/updatestock/${stock._id}`)}>Update</button>
              <button onClick={() => handleDelete(stock._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
<div className="fuel-level-btn-wrapper">
  <Link to="/fuel-levels" className="fuel-level-btn">View Fuel Levels</Link>
</div>

    </div>
  );
}

export default StockDisplay;
