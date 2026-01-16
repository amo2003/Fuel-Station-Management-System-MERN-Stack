import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/f2.png";
import "./BulkPaymentSlip.css";

function BulkPaymentSlip() {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const fuelType = location.state?.fuelType || "";
  const quantity = location.state?.quantity || 0;
  const pricePerLiter = location.state?.pricePerLiter || 0;
  const total = location.state?.total || 0;

  const [customerName, setCustomerName] = useState("");
  const [bankName, setBankName] = useState("");
  const [depositDate, setDepositDate] = useState("");
  const [depositAmount, setDepositAmount] = useState(total);
  const [slipFile, setSlipFile] = useState(null);

  useEffect(() => {
    setDepositAmount(total);
  }, [total]);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const handleSlipSubmit = async (e) => {
    e.preventDefault();
    if (!customerName || !bankName || !depositDate || !slipFile) {
      return alert("Please fill all slip details and upload file");
    }

    try {
      const formData = new FormData();
      formData.append("orderId", orderId);
      formData.append("fuelType", fuelType);
      formData.append("quantity", quantity);
      formData.append("pricePerLiter", pricePerLiter);
      formData.append("totalAmount", total);
      formData.append("paymentMethod", "slip");

      formData.append("customerName", customerName);
      formData.append("bankName", bankName);
      formData.append("depositDate", depositDate);
      formData.append("depositAmount", depositAmount);
      formData.append("slipFile", slipFile);

      const res = await axios.post(
        "http://localhost:5000/api/payments/slip",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.status === "ok") {
        alert("Slip Payment Submitted Successfully! We will verify and notify you.");
        navigate("/mainhome");
      }
    } catch (err) {
      console.error(err);
      alert("Payment submission failed.");
    }
  };

  return (
    <div className="b-bulk-payment-container">
      <div className="b-bulk-payment-overlay">
        <img src={logo} alt="Logo" className="b-bulk-payment-logo" />
        <div className="b-bulk-payment-card">
          <h2>🏦 Slip Payment for Bulk Order</h2>
          <p><strong>Fuel Type:</strong> {fuelType}</p>
          <p><strong>Quantity:</strong> {quantity} L</p>
          <p><strong>Total:</strong> Rs {total}</p>

          <form onSubmit={handleSlipSubmit} className="b-payment-form">
            <label>Customer Name:</label>
<input 
  type="text" 
  value={customerName} 
  onChange={(e) => {
    const lettersOnly = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // allow letters and spaces
    setCustomerName(lettersOnly);
  }} 
  required 
/>
<label>Bank Name:</label>
            <select 
              value={bankName} 
              onChange={(e) => setBankName(e.target.value)} 
              required
            >
              <option value="">-- Select Bank --</option>
              <option value="Bank of Ceylon">Bank of Ceylon - Galle - 91831765</option>
              <option value="People's Bank">People's Bank - Galle - 111035489652</option>
              <option value="Commercial Bank">Commercial Bank - Galle - 8010855917</option>
              <option value="Sampath Bank">Sampath Bank - Galle - 4586245</option>
            </select>

            <label>Deposit Date:</label>
            <input 
              type="date" 
              value={depositDate} 
              onChange={(e) => setDepositDate(e.target.value)} 
              min={today}  
              required 
            />

            <label>Deposit Amount:</label>
            <input type="number" value={depositAmount} readOnly />

            <label>Upload Slip (Photo Only):</label>
            <input type="file" onChange={(e) => setSlipFile(e.target.files[0])} accept="image/*" required />

            <button type="submit">Submit Payment Slip</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BulkPaymentSlip;
