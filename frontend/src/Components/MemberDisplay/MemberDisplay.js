import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./MemberDisplay.css";

function MemberDisplay() {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMembers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/members");
      setMembers(res.data.members);
      setFilteredMembers(res.data.members);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    const filtered = members.filter(
      (member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.gmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMembers(filtered);
  }, [searchTerm, members]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      try {
        await axios.delete(`http://localhost:5000/members/${id}`);
        fetchMembers();
      } catch (error) {
        console.error("Error deleting member:", error);
      }
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Fuel Station Staff Members", 14, 15);
    const tableColumn = [
      "Name",
      "Email",
      "Password",
      "Role",
      "Age",
      "Contact",
      "Address",
    ];
    const tableRows = [];

    filteredMembers.forEach((member) => {
      const memberData = [
        member.name,
        member.gmail,
        member.password,
        member.role,
        member.age?.toString() || "",
        member.contact,
        member.address,
      ];
      tableRows.push(memberData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 128, 185] },
    });

    doc.save("FuelStationStaff.pdf");
  };

  return (
    <div className="member-display-root">
      <nav className="payment-navbar">
        <div className="logo">👨‍🔧 Dasu Filling Station</div>
        <div className="nav-links">
          <Link to="/addmember">Add Staff</Link>
          <Link to="/admin">Admin Page</Link>
          <Link to="/mainhome">Logout</Link>
        </div>
      </nav>

      <div className="payment-container">
        <div className="header-with-logo">
          <img
            src={require("../../assets/f2.png")}
            alt="FuelFlow Logo"
            className="staff-logo"
          />
          <h2>Registered Fuel Station Staff</h2>
        </div>

        <input
          type="text"
          placeholder="Search by Name / Email / Role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

      <div className="memver-download-pdf-container">
      <button onClick={downloadPDF} className="member-btn-style-glass">
            📄 Download PDF
        </button>
        </div>


        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th className="text-center">Name</th>
                <th className="text-center">Email</th>
                <th className="text-center">Password</th>
                <th className="text-center">Role</th>
                <th className="text-center">Age</th>
                <th className="text-center">Contact</th>
                <th className="text-center">Address</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr key={member._id}>
                  <td>{member.name}</td>
                  <td>{member.gmail}</td>
                  <td>{member.password}</td>
                  <td>{member.role}</td>
                  <td className="text-center">{member.age}</td>
                  <td>{member.contact}</td>
                  <td>{member.address}</td>
                  <td className="actions-cell">
                    <Link to={`/updatemember/${member._id}`}>
                      <button className="btn-style-outline">✏ Edit</button>
                    </Link>

                    <button
                      className="btn-style-glass"
                      onClick={() => handleDelete(member._id)}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredMembers.length === 0 && (
                <tr>
                  <td colSpan="7" className="no-records">
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MemberDisplay;
