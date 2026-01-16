import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './UpdatePayment.css';

function UpdatePayment() {
  const { id } = useParams();
  const [payment, setPayment] = useState(null);
  const [pricePerLiter, setPricePerLiter] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/fuelpayments/${id}`);
        setPayment(res.data.payment);
        setPricePerLiter((res.data.payment.amount / res.data.payment.quantity).toFixed(2));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching payment:', err);
        setLoading(false);
      }
    };

    fetchPayment();
  }, [id]);

  const handleUpdate = async () => {
    const updatedAmount = payment.quantity * parseFloat(pricePerLiter);

    try {
      await axios.put(`http://localhost:5000/fuelpayments/${id}`, {
        stockId: payment.stockId,
        date: payment.date,
        type: payment.type,
        quantity: payment.quantity,
        supplier: payment.supplier,
        amount: updatedAmount
      });

      alert("Payment updated successfully!");
      navigate("/displaypayments");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update payment.");
    }
  };

  return (
    <div className="payment-page">
      <h2>Update Payment</h2>
      <Link to="/displaypayments" className="back-link">⬅ Back</Link>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="payment-card">
          <p><strong>Date:</strong> {new Date(payment.date).toLocaleDateString()}</p>
          <p><strong>Fuel Type:</strong> {payment.type}</p>
          <p><strong>Quantity:</strong> {payment.quantity} Liters</p>
          <p><strong>Supplier:</strong> {payment.supplier}</p>

          <label><strong>Update Price per Liter (Rs.):</strong></label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={pricePerLiter}
            onChange={(e) => setPricePerLiter(e.target.value)}
            className="price-input"
          />

          <p><strong>New Total:</strong> Rs. {(payment.quantity * parseFloat(pricePerLiter)).toFixed(2)}</p>

          <button className="confirm-btn" onClick={handleUpdate}>
            Update Payment
          </button>
        </div>
      )}
    </div>
  );
}

export default UpdatePayment;
