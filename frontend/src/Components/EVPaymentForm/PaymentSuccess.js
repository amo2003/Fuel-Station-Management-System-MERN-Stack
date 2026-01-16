import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import  './PaymentSuccess.css';
import logo from '../../assets/f2.png'; 
import { useNavigate } from 'react-router-dom';

function PaymentSuccess() {
    const navigate = useNavigate();
  

  return (
    <div className={'payment-success-container'}>
      <img src={logo} alt="Logo" className={'logo-top'} />
      <div className={'success-card'}>
        <FaCheckCircle className={'success-icon'} />
        <h2>Payment Successful!</h2>
        <p>Thank you for your payment. Your transaction has been completed successfully.</p>
        <div className={'payment-details'}>
          <p><strong>Transaction ID:</strong> #TXN567890123</p>
          <p><strong>Amount Paid:</strong> LKR 1,500.00</p>
          <p><strong>Payment Method:</strong> Visa Credit Card</p>
          <p><strong>Paid To:</strong> Dasu Fuel Station</p>
          <p><strong>Date:</strong> July 29, 2025</p>
        </div>
        <button className={'back-home-btn'} onClick={() => navigate("/mainhome")}>Back to Home</button>
      </div>
    </div>
  );
}

export default PaymentSuccess;
