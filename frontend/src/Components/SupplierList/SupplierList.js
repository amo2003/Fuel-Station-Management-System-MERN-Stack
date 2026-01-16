import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./SupplierList.css";
import logo from "../../assets/f2.png"; 

function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

  const fetchSuppliers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/suppliers");
      setSuppliers(res.data.suppliers);
    } catch (err) {
      console.error(err);
      alert("No Suppliers Found");
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this supplier?")) return;

    try {
      await axios.delete(`http://localhost:5000/suppliers/${id}`);
      alert("Supplier deleted successfully ");
      window.location.reload();
      fetchSuppliers();
    } catch (err) {
      console.error(err);
      alert("Error deleting supplier ");
    }
  };

  return (
    <div className="supplier-page">
      {/* Navbar */}
      <nav className="supplier-navbar">
        <h1>Dasu Filling Station, Galle.</h1>
        <div className="nav-links">
          <Link to="/admin" className="active">Admin</Link>
          <Link to="/suppliers/add">Add Supplier</Link>
        </div>
      </nav>

      {/* Logo */}
      <div className="supplier-logo">
        <img src={logo} alt="Logo" />
      </div>

      {/* Table Section */}
      <div className="supplier-table-container">
        <h2>Registerd Suppliers List</h2>
        {/*<Link to="/suppliers/add">
          <button className="add-btn">Add Supplier ➕</button>
        </Link>*/}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.length > 0 ? (
              suppliers.map((s) => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.gmail}</td>
                  <td>{s.age}</td>
                  <td>{s.address}</td>
                  <td>{s.contact}</td>
                  <td>
                    <button onClick={() => navigate(`/suppliers/update/${s._id}`)} className="supplier-update"> Update</button>
                    <button onClick={() => handleDelete(s._id)} className="supplier-delete-btn">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6">No suppliers found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SupplierList;
