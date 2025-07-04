import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DisplayRecord.css';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/f2.png';

function DisplayRecord() {
  const [sales, setSales] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = () => {
    axios.get("http://localhost:5000/sales")
      .then(res => setSales(res.data.sales))
      .catch(err => console.error("❌ Failed to fetch sales", err));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this sale record?")) {
      try {
        await axios.delete(`http://localhost:5000/sales/${id}`);
        setSales(sales.filter(sale => sale._id !== id));
        alert("✅ Sale deleted successfully");
      } catch (err) {
        console.error("❌ Failed to delete", err);
        alert("❌ Error deleting sale");
      }
    }
  };

  return (
    <div className="sale-records-page">
      <nav className="sale-navbar">
        <Link to="/" className="nav-title">Dasu Filling Station, Galle</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/addsales">Add Sales</Link>
          <Link to="/summary">Daily Summary</Link>
          <Link to="/logout">Logout</Link>
        </div>
      </nav>

      <div className="sale-header">
        <img src={logo} alt="Fuel Logo" className="center-logo" />
        <h2 className="sales-title">⛽ Fuel Sales Records</h2>
      </div>

      {/* ✅ Search Filter by Date */}
      <div className="search-bar">
        <label htmlFor="searchDate">📅 Filter by Date: </label>
        <input
          type="date"
          id="searchDate"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <button onClick={() => setSearchDate('')}>Reset</button>
      </div>

      {sales.length === 0 ? (
        <p className="no-data">No sales recorded yet.</p>
      ) : (
        <div className="sales-table">
          {sales
            .filter(sale => searchDate === '' || sale.date === searchDate)
            .map((sale) => (
              <div className="sale-card" key={sale._id}>
                <p><strong>Date:</strong> {sale.date}</p>
                <p><strong>Fuel Type:</strong> {sale.type}</p>
                <p><strong>Sold Quantity:</strong> {sale.soldQuantity} Liters</p>
                <p><strong>Staff:</strong> {sale.staff}</p>
                <div className="sale-actions">
                  <button onClick={() => navigate(`/updatesales/${sale._id}`)}>Update</button>
                  <button onClick={() => handleDelete(sale._id)}>Delete</button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default DisplayRecord;
