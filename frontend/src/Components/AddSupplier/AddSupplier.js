import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./AddSupplier.css";
import logo from "../../assets/f2.png"; 

function AddSupplier() {
  const navigate = useNavigate();

  const [supplier, setSupplier] = useState({
    name: "",
    gmail: "",
    age: "",
    address: "",
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict letters for age and contact
    if (name === "age" || name === "contact") {
      if (/^\d*$/.test(value)) setSupplier({ ...supplier, [name]: value });
    } 
    // Restrict letters only for name and address
    else if (name === "name" || name === "address") {
      if (/^[a-zA-Z\s]*$/.test(value)) setSupplier({ ...supplier, [name]: value });
    } 
    // Email field: no restriction
    else {
      setSupplier({ ...supplier, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/suppliers", supplier);
      alert("Supplier added successfully ✅");
      navigate("/suppliers");
    } catch (err) {
      console.error(err);
      alert("Error adding supplier ❌");
    }
  };

  return (
    <div className="add-supplier-page">
      <nav className="add-supplier-navbar">
        <h1>Dasu Filling Station, Galle.</h1>
        <div className="nav-links">
          <Link to="/admin">Admin</Link>
          <Link to="/suppliers/add" className="active">Add Supplier</Link>
        </div>
      </nav>

      <div className="add-supplier-logo">
        <img src={logo} alt="Logo" />
      </div>

      <div className="add-supplier-form-container">
        <h2>Add Supplier</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={supplier.name} onChange={handleChange} required />
          <input type="email" name="gmail" placeholder="Email" value={supplier.gmail} onChange={handleChange} required />
          <input type="text" name="age" placeholder="Age" value={supplier.age} onChange={handleChange} required />
          <input type="text" name="address" placeholder="Address" value={supplier.address} onChange={handleChange} required />
          <input type="text" name="contact" placeholder="Contact" value={supplier.contact} onChange={handleChange} required />
          <button type="submit">Add Supplier</button>
        </form>
      </div>
    </div>
  );
}

export default AddSupplier;
