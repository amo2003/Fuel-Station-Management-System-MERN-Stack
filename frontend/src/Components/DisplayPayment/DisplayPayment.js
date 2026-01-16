import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; 
import './DisplayPayment.css';
import logo from '../../assets/f2.png'; 

function DisplayPayment() {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPayments() {
      try {
        const res = await axios.get('http://localhost:5000/fuelpayments');
        setPayments(res.data.payments);
        setFilteredPayments(res.data.payments);
      } catch (err) {
        console.error('Failed to fetch payments:', err);
      }
    }
    fetchPayments();
  }, []);

  useEffect(() => {
    if (!searchDate) {
      setFilteredPayments(payments);
    } else {
      const filtered = payments.filter(p => {
        const paymentDate = new Date(p.date).toISOString().slice(0, 10);
        return paymentDate === searchDate;
      });
      setFilteredPayments(filtered);
    }
  }, [searchDate, payments]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      try {
        await axios.delete(`http://localhost:5000/fuelpayments/${id}`);
        const updatedPayments = payments.filter(payment => payment._id !== id);
        setPayments(updatedPayments);
        setFilteredPayments(updatedPayments.filter(p => {
          if (!searchDate) return true;
          const paymentDate = new Date(p.date).toISOString().slice(0, 10);
          return paymentDate === searchDate;
        }));
        alert('Payment deleted successfully!');
      } catch (err) {
        console.error('Delete failed:', err);
        alert('Failed to delete payment.');
      }
    }
  };

  // ✅ PDF Download Function
  const downloadPDF = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Convert imported logo to Base64
  const img = new Image();
  img.src = logo; 

  img.onload = () => {
    const logoWidth = 20;
    const logoHeight = 20;
    const logoX = (pageWidth - logoWidth) / 2;
    const logoY = 10;
    doc.addImage(img, 'PNG', logoX, logoY, logoWidth, logoHeight);

    // --- Add report title ---
    doc.setFontSize(16);
    doc.text('Fuel Payment Report - Dasu Fuel Station, Galle.', pageWidth / 2, 40, { align: 'center' });


    autoTable(doc, {
      startY: 50,
      head: [['Date', 'Fuel Type', 'Quantity (L)', 'Supplier', 'Amount (Rs)']],
      body: filteredPayments.map(p => [
        new Date(p.date).toLocaleDateString(),
        p.type,
        p.quantity,
        p.supplier,
        p.amount.toFixed(2),
      ]),
      theme: 'grid',
      headStyles: { fillColor: [0, 102, 204] },
    });

    
    doc.setFontSize(12);
    doc.text('Authorized Signature:', pageWidth - 80, pageHeight - 30);
   // doc.line(pageWidth - 50, pageHeight - 30, pageWidth - 20, pageHeight - 30);

    // --- Save PDF ---
    doc.save('Fuel Payments Report.pdf');
  };

  img.onerror = () => {
    alert('Error loading logo from assets folder.');
  };
};


  return (
    <div className="d-payment-page-unique">
      <header className="d-payment-header">
        <h1>Payments For Fuel Overview</h1>
        <div>
          <button className="d-back-to-admin-btn" onClick={() => navigate('/admin')}>
            ⬅ Back to Admin Page
          </button>
          <div>
          <button className="dis-fuel-download-pdf-btn" onClick={downloadPDF}>
            📄 Download Fuel Payment Report
          </button>
          </div>
        </div>
      </header> 

      <div className="d-filter-bar">
        <label htmlFor="search-date">Filter by Date:</label>
        <input
          type="date"
          id="search-date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        {searchDate && (
          <button className="d-clear-btn" onClick={() => setSearchDate('')}>
            Clear
          </button>
        )}
      </div>

      {filteredPayments.length === 0 ? (
        <p className="d-no-payments-msg">No payment records available for the selected date.</p>
      ) : (
        <section className="d-payments-list">
          {filteredPayments.map(p => (
            <article key={p._id} className="d-payment-entry">
              <div className="d-payment-info">
                <div><strong>Date:</strong> {new Date(p.date).toLocaleDateString()}</div>
                <div><strong>Fuel Type:</strong> {p.type}</div>
                <div><strong>Quantity:</strong> {p.quantity} Liters</div>
                <div><strong>Supplier:</strong> {p.supplier}</div>
                <div><strong>Amount:</strong> Rs. {p.amount.toFixed(2)}</div>
              </div>
              <div className="d-payment-controls">
                <button
                  className="d-btn-update"
                  onClick={() => navigate(`/updatepayment/${p._id}`)}
                >
                  Update
                </button>
                <button
                  className="d-btn-delete"
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}

export default DisplayPayment;
