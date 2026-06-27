import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CustomerPayments() {
  const { customerId } = useParams();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get(`https://eac34b48-2a45-4b11-86c9-a129e031408d-prod.e1-us-east-azure.choreoapis.dev/fuel/backend/v1.0/api/payments/customer/${customerId}`);
        if (res.data.status === "ok") setPayments(res.data.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch payments");
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, [customerId]);

  if (loading) return <p>Loading payments...</p>;
  if (!payments.length) return <p>No payments found.</p>;

  return (
    <div className="container">
      <h2>Your Payments</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Amount</th>
            <th>Payment Method</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p._id}>
              <td>{p.orderId?._id}</td>
              <td>{p.totalAmount}</td>
              <td>{p.paymentMethod}</td>
              <td>
                {p.status === "pending" && <span>Pending</span>}
                {p.status === "approved" && <span>Approved</span>}
                {p.status === "rejected" && <span>Rejected</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerPayments;
