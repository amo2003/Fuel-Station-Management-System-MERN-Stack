import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminBulkOrders.css"; 
import logo from '../../assets/f2.png';

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function AdminBulkOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingId, setProcessingId] = useState(null);
  const [searchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");


  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:5000/api/bulkorders/all");
      if (res.data.status === "ok") {
        setOrders(res.data.data);
      } else {
        setError(res.data.message || "Failed to load orders");
      }
    } catch (err) {
      setError("Error loading orders");
    } finally {
      setLoading(false);
      setProcessingId(null);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, action) => {
    if (action === "cancel" && !window.confirm("Are you sure you want to cancel this order?")) return;
    if (action === "undo" && !window.confirm("Are you sure you want to undo the confirmation?")) return;

    setProcessingId(orderId);
    try {
      let url = "";
      if (action === "confirm") {
        url = `http://localhost:5000/api/bulkorders/confirm/${orderId}`;
      } else if (action === "cancel") {
        url = `http://localhost:5000/api/bulkorders/reject/${orderId}`;
      } else if (action === "undo") {
        url = `http://localhost:5000/api/bulkorders/undo-confirm/${orderId}`;
      }

      const res = await axios.put(url);
      if (res.data.status === "ok") {
        alert(
          `Order ${
            action === "confirm"
              ? "confirmed"
              : action === "cancel"
              ? "cancelled"
              : "undo successful"
          }`
        );
        fetchOrders();
      } else {
        alert(res.data.message || "Action failed");
        setProcessingId(null);
      }
    } catch {
      alert("Error performing action");
      setProcessingId(null);
    }
  };

  const deleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order? This cannot be undone.")) return;

    setProcessingId(orderId);
    try {
      const res = await axios.delete(`http://localhost:5000/api/bulkorders/${orderId}`);
      if (res.data.status === "ok") {
        alert("Order deleted successfully");
        fetchOrders();
      } else {
        alert(res.data.message || "Delete failed");
        setProcessingId(null);
      }
    } catch {
      alert("Error deleting order");
      setProcessingId(null);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const customerName = (order.customerId?.company || order.customerId?.name || "").toLowerCase();
    const fuelType = order.fuelType.toLowerCase();
    const status = order.status.toLowerCase();
    const search = searchTerm.toLowerCase();

    const matchesText =
      customerName.includes(search) ||
      fuelType.includes(search) ||
      status.includes(search);

    let matchesDate = true;
    if (searchDate) {
      if (!order.preferredDate) {
        matchesDate = false;
      } else {
        const orderDate = new Date(order.preferredDate);
        const filterDate = new Date(searchDate);
        orderDate.setHours(0, 0, 0, 0);
        filterDate.setHours(0, 0, 0, 0);

        matchesDate = orderDate >= filterDate;
      }
    }

    return matchesText && matchesDate;
  });

  //pdf function
   const downloadPDF = () => {
    if (filteredOrders.length === 0) {
      alert("No orders to export!");
      return;
    }

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const img = new Image();
    img.src = logo;

    img.onload = () => {
      const logoWidth = 25;
      const logoHeight = 25;
      const logoX = (pageWidth - logoWidth) / 2;
      const logoY = 10;
      doc.addImage(img, "PNG", logoX, logoY, logoWidth, logoHeight);

      doc.setFontSize(16);
      doc.text("Bulk Orders Report - Dasu Fuel Station, Galle", pageWidth / 2, 45, {
        align: "center",
      });

      const columns = [
        { header: "#", dataKey: "no" },
        { header: "Customer", dataKey: "customer" },
        { header: "Fuel Type", dataKey: "fuelType" },
        { header: "Quantity (L)", dataKey: "quantity" },
        { header: "Preferred Date", dataKey: "preferredDate" },
        { header: "Status", dataKey: "status" },
      ];

      const rows = filteredOrders.map((order, index) => ({
        no: index + 1,
        customer: order.customerId?.company || order.customerId?.name || "N/A",
        fuelType: order.fuelType,
        quantity: order.quantity,
        preferredDate: order.preferredDate
          ? new Date(order.preferredDate).toLocaleDateString()
          : "-",
        status: order.status,
      }));

      autoTable(doc, {
        startY: 55,
        columns,
        body: rows,
        theme: "grid",
        headStyles: { fillColor: [0, 102, 204] },
        styles: { fontSize: 10 },
        margin: { left: 14, right: 14 },
      });

      const totalQuantity = filteredOrders.reduce((sum, o) => sum + (o.quantity || 0), 0);
      const finalY = doc.lastAutoTable?.finalY || 70;
      doc.setFontSize(13);
      doc.text(`Total Quantity: ${totalQuantity.toFixed(2)} L`, 14, finalY + 10);

      doc.setFontSize(12);
      doc.text("Authorized Signature:", pageWidth - 80, pageHeight - 30);

      doc.save("Bulk_Orders_Report.pdf");
    };

    img.onerror = () => {
      alert("Error loading logo.");
    };
  };


  if (error) return <p className="error-text">{error}</p>;
  if (!loading && filteredOrders.length === 0) return <p className="no-orders-text">No orders match your search.</p>;

  return (
    <div className="admin-bulk-orders">

      {/* Navbar */}
      <nav className="bulk-navbar">
        <div className="bulk-nav-logo">
          <span>Dasu Filling Station, Galle</span>
        </div>
        <ul className="bulk-nav-links">
          <li><a href="/admin">Admin</a></li>
          <li><a href="/">Logout</a></li>
        </ul>
      </nav>

      <div className="bulk-logo-container">
        <img src={logo} alt="Company Logo" className="bulk-logo" />
      </div>

      <h2 className="border-title">All Bulk Orders.</h2>

      {/* Search  */}
      <div className="bulk-search-controls">
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="bulk-date-input"
        />
        <div>
        <button className="btn btn-download" onClick={downloadPDF}>
          Download PDF
        </button>
        </div>
      </div>

      <table className="orders-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Fuel Type</th>
            <th>Quantity (L)</th>
            <th>Ordered Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order._id}>
              <td>{order.customerId?.company || order.customerId?.name || "N/A"}</td>
              <td>{order.fuelType}</td>
              <td>{order.quantity}</td>
              <td>{order.preferredDate ? new Date(order.preferredDate).toLocaleDateString() : "-"}</td>
              <td>{order.status}</td>
              <td>
                {order.status === "pending" ? (
                  <>
                    <button
                      className="btn btn-confirm"
                      onClick={() => updateOrderStatus(order._id, "confirm")}
                      disabled={processingId === order._id}
                    >
                      Confirm
                    </button>
                    <button
                      className="btn btn-cancel"
                      onClick={() => updateOrderStatus(order._id, "cancel")}
                      disabled={processingId === order._id}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => deleteOrder(order._id)}
                      disabled={processingId === order._id}
                    >
                      Delete
                    </button>
                  </>
                ) : order.status === "confirmed" ? (
                  <>
                    <button
                      className="btn btn-undo"
                      onClick={() => updateOrderStatus(order._id, "undo")}
                      disabled={processingId === order._id}
                    >
                      Undo
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => deleteOrder(order._id)}
                      disabled={processingId === order._id}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <>
                    <span className="no-actions">No actions</span>
                    <button
                      className="btn btn-delete"
                      onClick={() => deleteOrder(order._id)}
                      disabled={processingId === order._id}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminBulkOrders;
