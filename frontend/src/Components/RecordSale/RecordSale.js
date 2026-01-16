import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './RecordSale.css';
import logo from '../../assets/f2.png';

function RecordSale() {
  const navigate = useNavigate();
  const [types, setTypes] = useState([]);
  const [members, setMembers] = useState([]); // dynamic staff list

  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState({
    date: today,
    type: '',
    soldQuantity: '',
    staff: ''
  });

  // Fetch fuel types
  useEffect(() => {
    axios.get("http://localhost:5000/stocks/fuelLevels")
      .then(res => {
        const fuelTypes = res.data.storage.map(item => item.type);
        setTypes(fuelTypes);
      })
      .catch(err => console.error("Error fetching fuel types", err));
  }, []);

  // Fetch staff members
  useEffect(() => {
    axios.get("http://localhost:5000/Members")
      .then(res => setMembers(res.data.members || []))
      .catch(err => console.error("Error fetching members", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent negative numbers for soldQuantity
    if (name === 'soldQuantity') {
      if (Number(value) < 0) return; // ignore negative input
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.type || !form.soldQuantity || !form.staff) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/sales", form);
      console.log("Sale response:", res.data);
      alert("Sale recorded successfully ✅");
      setForm({ ...form, soldQuantity: '', staff: '' });
      navigate('/admin'); 
    } catch (err) {
      console.error("Error recording sale:", err);
      alert("Failed to record sale ❌");
    }
  };

  return (
    <div className="record-sale-page">
      <nav className="record-navbar">
        <div className="nav-left">
          <h2 className="brand-name">Dasu Filling Station, Galle</h2>
        </div>
        <div className="nav-right">
          <Link to="/">Home</Link>
          <Link to="/sales">View Sales</Link>
          <Link to="/summary">Summary</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/">Logout</Link>
        </div>
      </nav>

      <img src={logo} alt="Fuel Logo" className="record-logo" />
      <div className="record-content">
        <h2>📝 Record Daily Fuel Sale</h2>

        <form onSubmit={handleSubmit} className="sale-form">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            min={today}
            onChange={handleChange}
            required
          />

          <label>Fuel Type</label>
          <select name="type" value={form.type} onChange={handleChange} required>
            <option value="">-- Select Type --</option>
            {types.map((t, i) => <option key={i} value={t}>{t}</option>)}
          </select>

          <label>Sold Quantity (Liters)</label>
          <input
            type="number"
            name="soldQuantity"
            value={form.soldQuantity}
            min={0} // ✅ enforce min 0
            onChange={handleChange}
            required
          />

          <label>Staff Name</label>
          <select name="staff" value={form.staff} onChange={handleChange} required>
            <option value="">-- Select Staff --</option>
            {members.map((m) => (
              <option key={m._id} value={m.name}>{m.name}</option>
            ))}
          </select>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default RecordSale;
