import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './UpdateStock.css';
import logo from '../../assets/f2.png';

function UpdateStock() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [stock, setStock] = useState({
    date: '',
    type: '', 
    quantity: '',
    supplier: ''
  });

  const [suppliers, setSuppliers] = useState([]); // ✅ dynamic supplier list
  const [originalQuantity, setOriginalQuantity] = useState(0);
  const [originalType, setOriginalType] = useState('');

  // ✅ Fetch suppliers
  const fetchSuppliers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/suppliers");
      setSuppliers(res.data.suppliers || []);
    } catch (err) {
      console.error("Error fetching suppliers:", err);
      alert("Unable to fetch suppliers ❌");
    }
  };

  // ✅ Fetch stock by ID
  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/stocks/${id}`);
        const stockData = res.data.stock;

        setStock({
          date: stockData.date,
          type: stockData.type,
          quantity: stockData.quantity,
          supplier: stockData.supplier || ""
        });

        setOriginalQuantity(stockData.quantity);
        setOriginalType(stockData.type);
      } catch (err) {
        console.error('Error fetching stock:', err);
        alert("Failed to load stock ❌");
      }
    };

    fetchStock();
    fetchSuppliers();
  }, [id]);

  const handleChange = (e) => {
    setStock({ ...stock, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...stock,
        originalQuantity,
        originalType
      };

      await axios.put(`http://localhost:5000/stocks/${id}`, payload);
      alert('Stock updated successfully ✅');
      navigate(`/displaystock/${id}`);
    } catch (err) {
      console.error('Update failed:', err);
      alert('Update failed ❌ Please try again.');
    }
  };

  return (
    <div className="addfuelstaff-page">
      <div className="addfuelstaff-container">
        <div className="form-header">
          <img src={logo} alt="Logo" className="station-logo" />
          <h1 className="addfuelstaff-title">Update Fuel Stock Entry</h1>
        </div>

        <form onSubmit={handleSubmit} className="addfuelstaff-form">
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={stock.date ? stock.date.split('T')[0] : ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Fuel Type:</label>
            <select name="type" value={stock.type} onChange={handleChange} required>
              <option value="">-- Select Fuel Type --</option>
              <option value="Diesel">Diesel</option>
              <option value="Kerosene">Kerosene</option>
              <option value="Petrol 92">Petrol 92</option>
              <option value="Petrol 95">Petrol 95</option>
              <option value="Auto Diesel">Auto Diesel</option>
            </select>
          </div>

          <div className="form-group">
            <label>Quantity (Liters):</label>
            <input
              type="number"
              name="quantity"
              value={stock.quantity}
              onChange={handleChange}
              required
              min={0}
            />
          </div>

          <div className="form-group">
            <label>Supplier Name:</label>
            <select
              name="supplier"
              value={stock.supplier}
              onChange={handleChange}
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

          <button type="submit" className="submit-btn">Update Stock</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateStock;
