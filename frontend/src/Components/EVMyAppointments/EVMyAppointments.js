import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./EVMyAppointments.css";

function EVMyAppointments() {
  const { gmail } = useParams();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/appoinment/getAppointmentsByEmail?gmail=${gmail}`
        );
        if (Array.isArray(res.data)) {
          setAppointments(res.data);
          setFilteredAppointments(res.data);
        } else {
          setError("No appointments found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [gmail]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await axios.delete(`http://localhost:5000/appoinment/delete/${id}`);
        const updated = appointments.filter((a) => a._id !== id);
        setAppointments(updated);
        setFilteredAppointments(updated);
        alert("Appointment deleted successfully!");
      } catch (err) {
        alert("Failed to delete appointment.");
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/appoinment/update/${id}`);
  };

  const handleSearch = (e) => {
    const date = e.target.value;
    setSearchDate(date);
    if (date === "") {
      setFilteredAppointments(appointments);
    } else {
      const filtered = appointments.filter((a) => a.date === date);
      setFilteredAppointments(filtered);
    }
  };

  const downloadPDF = () => {
    if (filteredAppointments.length === 0) {
      alert("No appointments to download.");
      return;
    }

    const doc = new jsPDF();
    doc.text("My EV Appointments", 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [["Name", "Email", "Vehicle", "Date", "Slot"]],
      body: filteredAppointments.map((a) => [a.name, a.gmail, a.vtype, a.date, a.slot]),
    });

    doc.save("My_Appointments.pdf");
  };

  if (loading) return <div className="evapp-loading">Loading appointments...</div>;
  if (error) return <div className="evapp-error-msg">{error}</div>;

  return (
    <div className="evapp-page">
      <h2 className="evapp-heading">My Booked Appointments</h2>

      {/* Search and PDF section */}
      <div className="eevapp-search-pdf">
        <input
          type="date"
          value={searchDate}
          onChange={handleSearch}
          className="eevapp-search-input"
        />
        <button className="evapp-btn evapp-pdf-btn" onClick={downloadPDF}>
          Download PDF
        </button>
      </div>

      <div className="evapp-container">
        {filteredAppointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          filteredAppointments.map((a) => (
            <div key={a._id} className="evapp-card">
              <div className="evapp-info-horizontal">
                <p><strong>Name:</strong> {a.name}</p>
                <p><strong>Email:</strong> {a.gmail}</p>
                <p><strong>Vehicle:</strong> {a.vtype}</p>
                <p><strong>Date:</strong> {a.date}</p>
                <p><strong>Time Slot:</strong> {a.slot}</p>
              </div>

              <div className="evapp-actions">
                <button className="evvvv-edit-btn" onClick={() => handleUpdate(a._id)}>
                  Update
                </button>
                <button className="evvvv-delete-btn" onClick={() => handleDelete(a._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <button className="evabtn" onClick={() => navigate("/mainhome")}>
        🏠 Back Home
      </button>
    </div>
  );
}

export default EVMyAppointments;
