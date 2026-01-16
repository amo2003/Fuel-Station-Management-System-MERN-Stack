import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/f2.png'; 
import './BulkOrderForm.css';

function PlaceOrder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fuelType, setFuelType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [preferredDate, setPreferredDate] = useState('');

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Ensure a date is selected
    if (!preferredDate) {
      alert("Please select an ordering date.");
      return;
    }

    // Validation: Minimum order quantity
    if (Number(quantity) < 100) {
      alert("Minimum order quantity is 100 Liters.");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:5000/api/bulkorders/create/${id}`, {
        fuelType,
        quantity,
        preferredDate,
      });

      if (res.data.status === 'ok') {
        alert('Order request submitted successfully');
        navigate(`/factory/profile/${id}`);
      } else {
        alert(res.data.message || 'Error submitting order request.');
      }
    } catch (err) {
      console.error(err);
      alert('Error submitting order request.');
    }
  };

  return (
    <div className="border-placeorder-page">
      <nav className="border-placeorder-navbar">
        <div className="border-nav-logo">Dasu Filling Station, Galle</div>
        <div className="border-nav-links">
          <Link to="/">Home</Link>
          <Link to={`/factory/profile/${id}`}>Profile</Link>
          <Link to="/logout">Logout</Link>
        </div>
      </nav>

      <div className="border-logo-container">
        <img src={logo} alt="Company Logo" className="border-logo" />
      </div>

      <div>
        <form className="border-placeorder-form" onSubmit={handleSubmit}>
          <label>Fuel Type:</label>
          <select 
            value={fuelType} 
            onChange={e => setFuelType(e.target.value)} 
            required
          >
            <option value="">Select fuel type</option>
            <option value="Petrol 95">Petrol 95</option>
            <option value="Petrol 92">Petrol 92</option>
            <option value="Diesel">Diesel</option>
            <option value="Kerosene">Kerosene</option>
            <option value="Auto Diesel">Auto Diesel</option>
          </select>

          <label>Quantity (Liters):</label>
          <input
            type="number"
            min="100"  // Minimum 100L
            value={quantity}
            onChange={e => {
              const val = e.target.value;
              if (val === '' || Number(val) >= 0) {
                setQuantity(val);
              }
            }}
            required
            placeholder='Minimum Quantity is 100L'
          />

          <label>Ordering Date:</label>
          <input
            type="date"
            value={preferredDate}
            onChange={e => setPreferredDate(e.target.value)}
            min={today}   // Only allow today
            max={today}   // Only allow today
            required
          />

          <button type="submit" className="border-submit-btn">Submit Order</button>
        </form>
      </div>
    </div>
  );
}

export default PlaceOrder;
