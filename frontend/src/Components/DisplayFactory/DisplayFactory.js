// src/pages/AllFactories.js
import React, { useEffect, useState } from 'react';
import {  Link } from 'react-router-dom';
//import { useNavigate  } from 'react-router-dom';
import axios from 'axios';
import './DisplayFactory.css';
import logo from '../../assets/f2.png';

function AllFactories() {
  const [factories, setFactories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const navigate = useNavigate();

  useEffect(() => {
    const fetchFactories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/factory/getFactorys');
        if (res.data.status === 'ok') {
          setFactories(res.data.data);
          setFiltered(res.data.data);
        } else {
          setError(res.data.message || 'Error fetching factories');
        }
      } catch (err) {
        console.error(err);
        setError('Error fetching factories');
      } finally {
        setLoading(false);
      }
    };

    fetchFactories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this factory?')) {
      try {
        const res = await axios.delete(`http://localhost:5000/factory/deleteFactory/${id}`);
        if (res.data.status === 'ok') {
          alert('Factory deleted successfully');
          const updated = factories.filter((f) => f._id !== id);
          setFactories(updated);
          setFiltered(updated);
        } else {
          alert(res.data.message || 'Delete failed');
        }
      } catch (err) {
        alert('Error deleting factory');
      }
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const results = factories.filter((f) =>
      f.name.toLowerCase().includes(term) ||
      f.gmail.toLowerCase().includes(term) ||
      f.company.toLowerCase().includes(term)
    );
    setFiltered(results);
  };

  return (
    <div className="all-factories-wrapper">
      <nav className="factory-profile-navbar">
        <Link to="/" className="nav-logo">Dasu Fuel Station, Galle.</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/fregister">Register</Link>
        </div>
      </nav>

      <img src={logo} alt="Logo" className="factory-logo" />

      <div className="all-factories-container">
        <h2>📦 All Registered Commercial Customers</h2>

        <input
          type="text"
          placeholder="Search by name, email, or company"
          value={searchTerm}
          onChange={handleSearch}
          className="factory-search-input"
        />

        {loading ? (
          <p>Loading factories...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : filtered.length === 0 ? (
          <p>No factories found.</p>
        ) : (
          <table className="all-factories-table">
            <thead>
              <tr>
                <th>Owner Name</th>
                <th>Email</th>
                <th>Company Name</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((factory) => (
                <tr key={factory._id}>
                  <td>{factory.name}</td>
                  <td>{factory.gmail}</td>
                  <td>{factory.company}</td>
                  <td>{factory.address}</td>
                  <td>{factory.contact}</td>
                  <td>
                    {/*<button className="factory-action-btn view-btn" onClick={() => navigate(`/factory/profile/${factory._id}`)}>View</button>*/}
                    {/*<button className="factory-action-btn update-btn" onClick={() => navigate(`/factory/update/${factory._id}`)}>Update</button>*/}
                    <button className="factory-action-btn delete-btn" onClick={() => handleDelete(factory._id)}>Delete</button>
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

export default AllFactories;
