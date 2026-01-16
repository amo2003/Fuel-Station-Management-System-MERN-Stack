import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FactoryProfile.css';
import logo from '../../assets/f2.png';

function FactoryProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [factory, setFactory] = useState(null);
  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelingOrderId, setCancelingOrderId] = useState(null);

  const fetchData = useCallback(async () => {
  setLoading(true);
  try {
    const [factoryRes, ordersRes] = await Promise.all([
      axios.get(`http://localhost:5000/factory/getFactory/${id}`),
      axios.get(`http://localhost:5000/api/bulkorders/customer/${id}`)
    ]);

    if (factoryRes.data.status === 'ok') {
      setFactory(factoryRes.data.data);
    } else {
      setError(factoryRes.data.message || 'Error fetching factory');
    }

    if (ordersRes.data.status === 'ok') {
      setOrders(ordersRes.data.data);
    } else {
      setError(ordersRes.data.message || 'Error fetching orders');
    }
  } catch (err) {
    console.error(err);
    setError('Error fetching data');
  } finally {
    setLoading(false);
    setCancelingOrderId(null);
  }
}, [id]);

useEffect(() => {
  fetchData();
}, [fetchData]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this factory?')) {
      try {
        const res = await axios.delete(`http://localhost:5000/factory/deleteFactory/${id}`);
        if (res.data.status === 'ok') {
          alert('Factory deleted successfully');
          navigate('/flogin');
        } else {
          alert(res.data.message || 'Delete failed');
        }
      } catch (err) {
        alert('Error deleting factory');
        console.error(err);
      }
    }
  };

  const handleUpdate = () => {
    navigate(`/factory/update/${id}`);
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this pending order?')) return;

    setCancelingOrderId(orderId);
    try {
      const res = await axios.put(`http://localhost:5000/api/bulkorders/reject/${orderId}`);
      if (res.data.status === 'ok') {
        alert('Order cancelled successfully');
        navigate('/mainhome'); 
      } else {
        alert(res.data.message || 'Cancel failed');
        setCancelingOrderId(null);
      }
    } catch (err) {
      alert('Error cancelling order');
      console.error(err);
      setCancelingOrderId(null);
    }
  };

  if (loading) return ;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!factory) return <p>No factory data found.</p>;

  const pendingOrder = orders.find(order => order.status === 'pending');
  const confirmedOrder = orders.find(order => order.status === 'confirmed');

  return (
    <div className="factory-profile-wrapper">
      <img src={logo} alt="Logo" className="profile-logo" />

      {/* Top-right fixed home button */}
      <button className="fixed-home-btn" onClick={() => navigate("/mainhome")}>🏠 Home</button>

      <div className="factory-profile-glass-card">
        <h2>🌟 Customer Profile</h2>
        <div className="factory-details">
          <p><strong>🏭 Owner Name:</strong> {factory.name}</p>
          <p><strong>📧 Email:</strong> {factory.gmail}</p>
          <p><strong>🏢 Company Name:</strong> {factory.company}</p>
          <p><strong>📍 Address:</strong> {factory.address}</p>
          <p><strong>📞 Contact:</strong> {factory.contact}</p>
        </div>

        <div className="order-btn-group">
          {pendingOrder ? (
            <>
              <button className="pending-btn" disabled>
                ⏳ Pending, Wthin 2 or 3 days we will confirm your order!
              </button>
              <button
                className="cancel-btn"
                onClick={() => handleCancelOrder(pendingOrder._id)}
                disabled={cancelingOrderId === pendingOrder._id}
                style={{ marginLeft: '10px' }}
              >
                {cancelingOrderId === pendingOrder._id ? 'Cancelling...' : 'Cancel Order'}
              </button>
            </>
          ) : confirmedOrder ? (
         <button
          className="pay-btn"
          onClick={() => {
          console.log("Navigating to payment page with order id:", confirmedOrder._id);
          navigate(`/bulkpayment/${confirmedOrder._id}`, {
          state: {
            fuelType: confirmedOrder.fuelType,
            quantity: confirmedOrder.quantity
        } 
      });
    }}
          >💳 Pay Now
        </button>
        



          ) : (
            <button className="o-order-btn" onClick={() => navigate(`/placeorder/${id}`)}>
              📦 Place Order
            </button>
          )}

          <div className="sub-buttons">
            <button className="update-btn small" onClick={handleUpdate}>Update</button>
            <button className="delete-btn small" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FactoryProfile;
