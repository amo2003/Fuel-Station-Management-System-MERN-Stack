import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './EVDetails.css'; // Unique styling
import logo from '../../assets/f2.png';

function EVDetails() {
  const [evs, setEVs] = useState([]);
  const [filteredEVs, setFilteredEVs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEVs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/ev/getEVs');
        if (res.data.status === 'ok') {
          setEVs(res.data.data);
          setFilteredEVs(res.data.data);
        } else {
          setError(res.data.message || 'Error fetching EVs');
        }
      } catch (err) {
        console.error(err);
        setError('Error fetching EVs');
      } finally {
        setLoading(false);
      }
    };

    fetchEVs();
  }, []);

  // Filter logic on input change
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = evs.filter(ev =>
      ev.name.toLowerCase().includes(value) ||
      ev.gmail.toLowerCase().includes(value) ||
      ev.vtype.toLowerCase().includes(value)
    );
    setFilteredEVs(filtered);
  };

  return (
    <div className="ev-details-wrapper">
      <nav className="ev-navbar">
        <Link to="/" className="nav-logo">Dasu Filling Station, Galle.</Link>
        <div className="nav-links">
          <Link to="/admin">Admin</Link>
          <Link to="/">Logout</Link>
        </div>
      </nav>

      <img src={logo} alt="Logo" className="ev-logo" />

      <div className="ev-container">
        <h2>📦 All Registered EV Customers</h2>

        <input
          type="text"
          placeholder="🔍 Search by owner, email or type"
          className="ev-search-input"
          value={searchTerm}
          onChange={handleSearch}
        />

        {loading ? (
          <p>Loading EVs...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : filteredEVs.length === 0 ? (
          <p>No matching EVs found.</p>
        ) : (
          <table className="ev-table">
            <thead>
              <tr>
                <th>Owner Name</th>
                <th>Email</th>
                <th>EV Type</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEVs.map((ev) => (
                <tr key={ev._id}>
                  <td>{ev.name}</td>
                  <td>{ev.gmail}</td>
                  <td>{ev.vtype}</td>
                  <td>{ev.address}</td>
                  <td>{ev.contact}</td>
                  <td>
                    <button
                      className="ev-view-btn"
                      onClick={() => navigate(`/ev/profile/${ev._id}`)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default EVDetails;
