import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
import logo from "../../assets/f2.png";
import "./AdminPayment.css";

function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [searchDate, setSearchDate] = useState(""); // date filter
  const [filteredPayments, setFilteredPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  useEffect(() => {
    if (searchDate) {
      const filtered = payments.filter((p) =>
        p.createdAt?.startsWith(searchDate)
      );
      setFilteredPayments(filtered);
    } else {
      setFilteredPayments(payments);
    }
  }, [searchDate, payments]);

  const fetchPayments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/payments");
      if (res.data.status === "ok") {
        setPayments(res.data.data);
        setFilteredPayments(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch payments:", err);
    }
  };

  const handleDelete = async (paymentId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this payment?");
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`http://localhost:5000/api/payments/${paymentId}`);
      if (res.data.status === "ok") {
        alert("Payment deleted successfully");
        setPayments(payments.filter((p) => p._id !== paymentId));
      }
    } catch (err) {
      console.error("Failed to delete payment:", err);
      alert("Failed to delete payment");
    }
  };

  return (
    <div className="a-admin-payment-page">
      {/* Navbar */}
      <nav className="a-admin-navbar">
        <Link to="/" className="a-nav-logo">Dasu Filling Station, Galle.</Link>
        <div className="a-nav-links">
          <Link to="/admin">Admin</Link>
          <Link to="/">Logout</Link>
        </div>
      </nav>

      {/* Logo */}
      <img src={logo} alt="Logo" className="a-admin-logo" />

      <div className="a-admin-card">
        <h2>💳 Bulk Payment Records</h2>

        {/* Date Filter */}
        <div className="a-search-bar">
          <label>Search by Date:</label>
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </div>

        {filteredPayments.length === 0 ? (
          <p>No payments recorded yet.</p>
        ) : (
          <table className="a-admin-payment-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Fuel Type</th>
                <th>Quantity</th>
                <th>Price per Liter</th>
                <th>Total Amount</th>
                <th>Payment Method</th>
                <th>Card Info / Slip</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((p) => (
                <tr key={p._id}>
                  <td>{p.orderId?._id || "-"}</td>
                  <td>{p.fuelType}</td>
                  <td>{p.quantity}</td>
                  <td>{p.pricePerLiter}</td>
                  <td>{p.totalAmount}</td>
                  <td>{p.cardNumber ? "Card" : "Slip"}</td>
                  <td>
                    {p.cardNumber ? (
                      <>
                        <p>Card Number: {p.cardNumber}</p>
                        <p>Expiry: {p.expiryDate}</p>
                        <p>CVV: {p.cvv}</p>
                      </>
                    ) : (
                      <>
                        <p>Name: {p.customerName}</p>
                        <p>Bank: {p.bankName}</p>
                        <p>Date: {p.depositDate?.split("T")[0]}</p>
                        <p>Amount: Rs {p.depositAmount}</p>
                        {p.slipFile && (
                          <a
                            href={`http://localhost:5000/files/${p.slipFile}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Slip
                          </a>
                        )}
                      </>
                    )}
                  </td>
                  <td>{new Date(p.createdAt).toLocaleString()}</td>
                  <td>
                    <button
                      className="a-delete-btn"
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
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

export default AdminPayments;
