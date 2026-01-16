import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/f2.png";
import "./EVList.css";

function EVProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ev, setEV] = useState(null);
  const [hasAppointments, setHasAppointments] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch EV details
  useEffect(() => {
    const fetchEV = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/ev/getEV/${id}`);
        if (res.data.status === "ok") {
          setEV(res.data.data);
          setError(null);
        } else {
          setError(res.data.message || "Error fetching EV");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching EV");
      } finally {
        setLoading(false);
      }
    };

    fetchEV();
  }, [id]);

  // ✅ Check if the EV user has appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      if (ev?.gmail) {
        try {
          const res = await axios.get(
            `http://localhost:5000/appoinment/getAppointmentsByEmail?gmail=${ev.gmail}`
          );
          if (Array.isArray(res.data) && res.data.length > 0) {
            setHasAppointments(true);
          } else {
            setHasAppointments(false);
          }
        } catch (err) {
          console.error("Error checking appointments:", err);
        }
      }
    };

    fetchAppointments();
  }, [ev]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your EV profile?")) {
      try {
        const res = await axios.delete(`http://localhost:5000/ev/deleteEV/${id}`);
        if (res.data.status === "ok") {
          alert("EV profile deleted successfully");
          localStorage.removeItem("evUser");
          navigate("/evregister");
        } else {
          alert(res.data.message || "Delete failed");
        }
      } catch (err) {
        alert("Error deleting EV profile");
        console.error(err);
      }
    }
  };

  const handleUpdate = () => {
    navigate(`/ev/updateEV/${id}`);
  };

  const handleViewAppointments = () => {
    navigate(`/myappointments/${ev.gmail}`);
  };

  if (loading)
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading EV profile...</p>;
  if (error)
    return <p style={{ color: "red", textAlign: "center", marginTop: "2rem" }}>{error}</p>;
  if (!ev)
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>No EV data found.</p>;

  return (
    <div className="ev-profile-wrapper">
      <img src={logo} alt="Logo" className="profile-logo" />

      {/* Top-right fixed home button */}
      <button className="fixed-home-btn" onClick={() => navigate("/mainhome")}>
        🏠
      </button>

      <div className="ev-profile-glass-card">
        <h2>⚡ EV Owner Profile</h2>
        <div className="ev-details">
          <p><strong>👤 Name:</strong> {ev.name}</p>
          <p><strong>📧 Email:</strong> {ev.gmail}</p>
          <p><strong>🚗 EV Type:</strong> {ev.vtype}</p>
          <p><strong>📍 Address:</strong> {ev.address}</p>
          <p><strong>📞 Contact:</strong> {ev.contact}</p>
        </div>

        <div className="ev-actions-btn-group">
          <button className="ev-update-btn" onClick={handleUpdate}>Update Profile</button>
          <button className="book-btn" onClick={() => navigate(`/EVBookingPayment`)}>Book Charging Slot</button>

          {hasAppointments && (
            <button className="view-appointment-btn" onClick={handleViewAppointments}>
              View My Appointments
            </button>
          )}

          <button className="EV-delete-btn" onClick={handleDelete}>Delete Profile</button>
        </div>
      </div>
    </div>
  );
}

export default EVProfile;
