import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UpdateSale.css';
import logo from '../../assets/f2.png';

function UpdateSale() {
  const [members, setMembers] = useState([]); // dynamic staff list
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    date: '',
    type: '',
    soldQuantity: '',
    staff: ''
  });
 
  useEffect(() => {
    axios.get(`http://localhost:5000/sales/${id}`)
      .then(res => setForm(res.data.sale))
      .catch(err => console.error("Error fetching sale:", err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/sales/${id}`, form);
      alert("Sale updated successfully");
      navigate('/sales');
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update sale");
    }
  };

    // Fetch staff members
  useEffect(() => {
    axios.get("http://localhost:5000/Members")
      .then(res => setMembers(res.data.members || []))
      .catch(err => console.error("Error fetching members", err));
  }, []);


  return (
    <div className="update-sale-page">
      <div className="update-sale-content">
        <img src={logo} alt="Station Logo" className="update-logo" />
        <h2>✏️ Update Sale Record</h2>
        <form onSubmit={handleUpdate} className="update-sale-form">
          <label>Date</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} required />

          <label>Fuel Type</label>
          <input type="text" name="type" value={form.type} onChange={handleChange} required />

          <label>Sold Quantity (Liters)</label>
          <input type="number" name="soldQuantity" value={form.soldQuantity} onChange={handleChange} required />

          <label>Staff Name</label>
          <select type="text" name="staff" value={form.staff} onChange={handleChange} required>
            <option value="">-- Select Staff --</option>
            {members.map((m) => (
              <option key={m._id} value={m.name}>{m.name}</option>
            ))}
          </select>

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateSale;
