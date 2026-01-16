import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/f2.png';
import './UpdateEV.css';


function UpdateEV() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ev, setEV] = useState({
    name: '',
    gmail: '',
    vtype: '',
    address: '',
    contact: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEV = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/ev/getEV/${id}`);
        if (res.data.status === 'ok') {
          setEV(res.data.data);
          setError(null);
        } else {
          setError(res.data.message || 'Error fetching ev');
        }
      } catch (err) {
        console.error(err);
        setError('Error fetching ev');
      } finally {
        setLoading(false);
      }
    };

    fetchEV();
  }, [id]);

  const handleChange = (e) => {
    setEV({ ...ev, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`http://localhost:5000/ev/updateEV/${id}`, ev);
      if (res.data.status === 'ok') {
        alert('EV updated successfully');
        navigate(`/ev/profile/${id}`);
      } else {
        alert(res.data.message || 'Update failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating ev');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="update-ev-wrapper">
      <img src={logo} alt="Logo" className="profile-logo" />
      <div className="update-ev-glass-card">
        <h2>Update Customer Details</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Owner Name:</label>
            <input
              type="text"
              name="name"
              value={ev.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Email:</label>
            <input
              type="email"
              name="gmail"
              value={ev.gmail}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Vehicle Type:</label>
            <select
              name="vtype"
              value={ev.vtype}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={ev.address}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Contact:</label>
            <input
              type="text"
              name="contact"
              value={ev.contact}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateEV;