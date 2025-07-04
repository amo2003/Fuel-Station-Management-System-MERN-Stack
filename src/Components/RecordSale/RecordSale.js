// src/components/RecordSale.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  Link } from 'react-router-dom';
import './RecordSale.css';
import logo from '../../assets/f2.png';

function RecordSale() {

  const [types, setTypes] = useState([]);
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    type: '',
    soldQuantity: '',
    staff: ''
  });

  useEffect(() => {
    axios.get("http://localhost:5000/stocks/fuelLevels")
      .then(res => {
        const fuelTypes = res.data.storage.map(item => item.type);
        setTypes(fuelTypes);
      })
      .catch(err => console.error("Error fetching fuel types", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.type || !form.soldQuantity || !form.staff) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/sales", form);
      console.log("✅ Sale response:", res.data);
      alert("✅ Sale recorded successfully");
      setForm({ ...form, soldQuantity: '', staff: '' });
    } catch (err) {
      console.error("Error recording sale:", err);
      alert("❌ Failed to record sale");
    }
  };

  return (
    <div className="record-sale-page">
      {/* ✅ Custom Navbar */}
      <nav className="record-navbar">
        <div className="nav-left">
          <h2 className="brand-name">Dasu Filling Station,Galle</h2>
        </div>
        <div className="nav-right">
          <Link to="/">Home</Link>
          <Link to="/sales">View Sales</Link>
          <Link to="/summary">Summary</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/logout">Logout</Link>
        </div>
      </nav>

      <img src={logo} alt="Fuel Logo" className="record-logo" />
      <div className="record-content">
        <h2>📝 Record Daily Fuel Sale</h2>

        <form onSubmit={handleSubmit} className="sale-form">
          <label>Date</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} />

          <label>Fuel Type</label>
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="">-- Select Type --</option>
            {types.map((t, i) => <option key={i} value={t}>{t}</option>)}
          </select>

          <label>Sold Quantity (Liters)</label>
          <input type="number" name="soldQuantity" value={form.soldQuantity} onChange={handleChange} />

          <label>Staff Name</label>
          <input type="text" name="staff" value={form.staff} onChange={handleChange} />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default RecordSale;
