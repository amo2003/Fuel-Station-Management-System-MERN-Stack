// src/components/DailySummary.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../../assets/f2.png';
import './DailyIncomeSummary.css';

function DailySummary() {
  const [sales, setSales] = useState([]);
  const [prices, setPrices] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/sales")
      .then(res => setSales(res.data.sales))
      .catch(err => console.error("❌ Failed to fetch sales", err));
  }, []);

  const handlePriceChange = (fuelType, value) => {
    setPrices(prev => ({
      ...prev,
      [fuelType]: value
    }));
  };

  const getDailySummary = () => {
    const summary = {};
    sales.forEach(({ date, type, soldQuantity }) => {
      if (!summary[date]) summary[date] = {};
      if (!summary[date][type]) summary[date][type] = { totalLiters: 0, income: 0 };

      const qty = parseFloat(soldQuantity) || 0;
      const price = parseFloat(prices[type]) || 0;

      summary[date][type].totalLiters += qty;
      summary[date][type].income += qty * price;
    });
    return summary;
  };

  const dailySummary = getDailySummary();
  const uniqueFuelTypes = [...new Set(sales.map(sale => sale.type))];

  return (
    <div className="sale-records-page">
      {/* Navigation Bar */}
      <nav className="sale-navbar">
        <Link to="/" className="nav-title">Dasu Filling Station, Galle</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/addsales">Add Sales</Link>
          <Link to="/sales">Sales Records</Link>
          <Link to="/logout">Logout</Link>
        </div>
      </nav>

      {/* Clean Header without box */}
      <div className="sale-header">
        <img src={logo} alt="Fuel Logo" className="center-logo" />
        <h2 className="sales-title">📊 Daily Sales Summary</h2>
      </div>

      {/* Price Input Section */}
      <div className="price-entry-card">
        <h3>Enter Price Per Liter (Rs) by Fuel Type</h3>
        {uniqueFuelTypes.length === 0 ? (
          <p>No sales yet to determine fuel types.</p>
        ) : (
          uniqueFuelTypes.map(type => (
            <div key={type} className="fuel-price-input">
              <label>
                {type}: 
               Rs. <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder={`Price per liter for ${type}`}
                  value={prices[type] || ''}
                  onChange={e => handlePriceChange(type, e.target.value)}
                />
              </label>
            </div>
          ))
        )}
      </div>

      {/* Summary Table */}
      <div className="summary-table-card">
        <h3>Daily Sales & Income Summary</h3>
        {Object.keys(dailySummary).length === 0 ? (
          <p>No sales data to summarize.</p>
        ) : (
          Object.entries(dailySummary).map(([date, fuels]) => {
            const totalIncome = Object.values(fuels).reduce((sum, f) => sum + f.income, 0);
            const totalLiters = Object.values(fuels).reduce((sum, f) => sum + f.totalLiters, 0);

            return (
              <div key={date} className="summary-section">
                <h4>{date}</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Fuel Type</th>
                      <th>Total Liters Sold</th>
                      <th>Income (Rs)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(fuels).map(([fuelType, data]) => (
                      <tr key={fuelType}>
                        <td>{fuelType}</td>
                        <td>{data.totalLiters.toFixed(2)}</td>
                        <td>{data.income.toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr className="total-row">
                      <td>Total</td>
                      <td>{totalLiters.toFixed(2)}</td>
                      <td>{totalIncome.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default DailySummary;
