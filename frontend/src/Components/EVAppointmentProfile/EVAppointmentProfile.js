import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaCar,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaEnvelope,
  FaHome,
  FaFilePdf,
} from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import logo from "../../assets/f2.png";
import "./EVAppointmentProfile.css";

function AppointmentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/appoinment/getbyid/${id}`);
        setAppointment(res.data);
      } catch (err) {
        setError("Failed to fetch appointment");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await axios.delete(`http://localhost:5000/appoinment/delete/${id}`);
        setMessage("Appointment deleted successfully.");
        setTimeout(() => navigate("/mainhome"), 2000);
      } catch (err) {
        setError("Failed to delete appointment.");
      }
    }
  };

  const handlePayment = () => {
    navigate(`/mainhome`);
  };

  const handleEdit = () => {
    navigate(`/appoinment/update/${id}`);
  };

  const downloadPDF = () => {
  if (!appointment) return;

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  const img = new Image();
  img.src = logo;

  img.onload = () => {
    const logoWidth = 25;
    const logoHeight = 25;
    const logoX = (pageWidth - logoWidth) / 2;
    const logoY = 10;
    doc.addImage(img, "PNG", logoX, logoY, logoWidth, logoHeight);

    doc.setFontSize(16);
    doc.text("EV Appointment Details - Dasu Fuel Station, Galle", pageWidth / 2, 45, {
      align: "center",
    });

    const columns = [
      { header: "#", dataKey: "no" },
      { header: "Field", dataKey: "field" },
      { header: "Value", dataKey: "value" },
    ];

    const rows = [
      { no: 1, field: "Name", value: appointment.name },
      { no: 2, field: "Email", value: appointment.gmail },
      { no: 3, field: "Vehicle Type", value: appointment.vtype },
      { no: 4, field: "Date", value: appointment.date },
      { no: 5, field: "Time Slot", value: appointment.slot },
    ];

    autoTable(doc, {
      startY: 55,
      columns,
      body: rows,
      theme: "grid",
      headStyles: { fillColor: [0, 102, 204] },
      styles: { fontSize: 11 },
      margin: { left: 14, right: 14 },
    });

    const finalY = doc.lastAutoTable?.finalY || 70;
    doc.setFontSize(12);
    doc.text("Authorized Signature:", pageWidth - 80, finalY + 20);

    doc.save("EV_Appointment_Details.pdf");
  };

  img.onerror = () => {
    alert("Error loading logo.");
  };
};


  if (loading) return <div className="eeevapp-loading">Loading appointment...</div>;
  if (error) return <div className="eeevapp-error-msg">{error}</div>;

  return (
    <div className="eeevapp-page">
      <img src={logo} alt="Logo" className="eeevapp-logo" />
      <div className="eeevapp-container">
        <h2 className="eeevapp-heading">Appointment Profile</h2>

        {message && <p className="eeevapp-success">{message}</p>}
        {error && <p className="eeevapp-error">{error}</p>}

        <div className="eeevapp-card">
          <div className="eeevapp-info">
            <p><FaUser className="eeevapp-icon" /> <strong>Name:</strong> {appointment.name}</p>
            <p><FaEnvelope className="eeevapp-icon" /> <strong>Email:</strong> {appointment.gmail}</p>
            <p><FaCar className="eeevapp-icon" /> <strong>Vehicle Type:</strong> {appointment.vtype}</p>
            <p><FaCalendarAlt className="eeevapp-icon" /> <strong>Date:</strong> {appointment.date}</p>
            <p><FaClock className="eeevapp-icon" /> <strong>Time Slot:</strong> {appointment.slot}</p>
          </div>

          <div className="eeevapp-actions">
            <button onClick={handlePayment} className="eeeh-btn">
              <FaHome /> Home
            </button>
            <button onClick={downloadPDF} className="eeepdf-btn">
              <FaFilePdf /> Download PDF
            </button>
            <button onClick={handleEdit} className="eeeedit-btn">
              Edit
            </button>
            <button onClick={handleDelete} className="eeedelete-btn">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentProfile;
