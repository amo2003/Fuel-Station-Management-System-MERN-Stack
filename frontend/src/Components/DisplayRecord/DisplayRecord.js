import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DisplayRecord.css';
import { useNavigate, Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
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
      .catch(err => console.error("Failed to fetch sales", err));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this sale record?")) {
      try {
        await axios.delete(`http://localhost:5000/sales/${id}`);
        setSales(sales.filter(sale => sale._id !== id));
        alert("Sale deleted successfully");
      } catch (err) {
        console.error("Failed to delete", err);
        alert("Error deleting sale");
      }
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Fuel Sales Report", 14, 22);

    const filteredSales = sales.filter(
      sale => searchDate === '' || sale.date === searchDate
    );

    const tableData = filteredSales.map((sale, index) => [
      index + 1,
      sale.date,
      sale.type,
      sale.soldQuantity,
      sale.staff
    ]);

    autoTable(doc, {
      startY: 30,
      head: [['#', 'Date', 'Fuel Type', 'Sold Quantity (L)', 'Staff']],
      body: tableData,
    });

    doc.save('Fuel_Sales_Report.pdf');
  };

  return (
    <div className="sale-records-page">
      <nav className="sale-navbar">
        <Link to="/" className="nav-title">Dasu Filling Station, Galle</Link>
        <div className="nav-links">
          <Link to="/admin">Admin</Link>
          <Link to="/summary">Daily Summary</Link>
          <Link to="/">Logout</Link>
        </div>
      </nav>

      <div className="sale-header">
        <img src={logo} alt="Fuel Logo" className="center-logo" />
        <h2 className="sales-title">⛽ Fuel Sales Records</h2>
      </div>

      <div className="search-bar">
        <label htmlFor="searchDate">📅 Filter by Date: </label>
        <input 
          type="date"
          id="searchDate"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <button onClick={() => setSearchDate('')}>Reset</button>
        <div>
          <button onClick={downloadPDF} className="sales-pdf-btn">Download PDF</button>
        </div>
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
                <div>
                  <button className="RUpdate" onClick={() => navigate(`/updatesales/${sale._id}`)}>Update</button>
                  <button className="RDelete" onClick={() => handleDelete(sale._id)}>Delete</button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default DisplayRecord;
