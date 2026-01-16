import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './SingleMember.css';
import logo from '../../assets/f2.png';

function SingleMember() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/members/${id}`);
        setMember(res.data.member);
      } catch (err) {
        console.error("Error fetching member:", err);
        alert("Member not found");
        navigate('/home'); 
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [id, navigate]);

  if (loading) return;
  if (!member) return <p>No member data available.</p>;

  return (
  <div className="single-member-container">
    <div className="single-member-wrapper">
      <img src={logo} alt="FuelFlow Logo" className="single-member-logo" />
      <h2 className="single-member-header">Member Details</h2>

      <div className="member-detail"><strong>Name:</strong> {member.name || "-"}</div>
      <div className="member-detail"><strong>Email:</strong> {member.gmail || "-"}</div>
      <div className="member-detail"><strong>Role:</strong> {member.role || "-"}</div>
      <div className="member-detail"><strong>Age:</strong> {member.age || "-"}</div>
      <div className="member-detail"><strong>Contact:</strong> {member.contact || "-"}</div>
      <div className="member-detail"><strong>Address:</strong> {member.address || "-"}</div>

<button onClick={() => navigate('/')}>← Back</button>
    </div>
  </div>
);
}

export default SingleMember;
