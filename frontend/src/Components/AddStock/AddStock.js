import React, { useState, useEffect } from 'react';
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
  const [suppliers, setSuppliers] = useState([]); // dynamic suppliers list

  // Fetch suppliers from backend
  const fetchSuppliers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/suppliers");
      setSuppliers(res.data.suppliers || []);
    } catch (err) {
      console.error("Error fetching suppliers:", err);
      alert("Unable to fetch suppliers ");
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleChange = (e) => {
    setStocks(prev => ({
      ...prev,
      [e.target.name]: e.target.value.trimStart(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/stocks", stocks);
      const stockId = res.data.stock?._id;
      if (!stockId) throw new Error("No stock ID returned");
      alert("Stock added successfully ✅");
      navigate(`/displaystock/${stockId}`);
    } catch (err) {
      alert("Error adding stock ❌ Check console for details");
      console.error(err);
    }
  };

  // ✅ Prevent past dates
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="b-addfuelstaff-page">
      <nav className="b-addfuelstaff-navbar">
        <Link to="/" className="b-nav-logo">Dasu Filling Station, Galle.</Link>
        <div className="b-nav-links">
          <Link to="/admin">Admin</Link>
          <Link to="/displaymember">Staff List</Link>
          <Link to="/mainhome">Logout</Link>
        </div>
      </nav>

      <div className="b-addfuelstaff-container">
        <div className="b-form-header">
          <img src={logo} alt="Dasu Filling Station Logo" className="b-station-logo" />
          <h1 className="b-addfuelstaff-title">Dasu Filling Station, Galle.</h1>
          <h2 className="b-addfuelstaff-subtitle">Add Fuel Stock Entry</h2>
        </div>

        <form onSubmit={handleSubmit} className="b-addfuelstaff-form">
          <div className="b-form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              min={today}   // 🚀 No past days allowed
              onChange={handleChange}
              value={stocks.date}
              required
            />
          </div>

          <div className="b-form-group">
            <label htmlFor="type">Fuel Type:</label>
            <select
              id="type"
              name="type"
              onChange={handleChange}
              value={stocks.type}
              required
            >
              <option value="">-- Select Fuel Type --</option>
              <option value="Diesel">Diesel</option>
              <option value="Kerosene">Kerosene</option>
              <option value="Petrol 92">Petrol 92</option>
              <option value="Petrol 95">Petrol 95</option>
              <option value="Auto Diesel">Auto Diesel</option>
            </select>
          </div>

          <div className="b-form-group">
            <label htmlFor="quantity">Quantity (Liters):</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              onChange={handleChange}
              value={stocks.quantity}
              min={0}
              required
            />
          </div>

          <div className="b-form-group">
            <label htmlFor="supplier">Supplier Name:</label>
            <select
              id="supplier"
              name="supplier"
              onChange={handleChange}
              value={stocks.supplier}
              required
            >
              <option value="">-- Select Supplier --</option>
              {suppliers.map((s) => (
                <option key={s._id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="b-submit-btn">Add Stock</button>
        </form>
      </div>
    </div>
  );
}

export default AddStock;
