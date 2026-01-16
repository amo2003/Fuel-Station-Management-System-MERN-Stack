import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./UpdateSupplier.css";
import logo from "../../assets/f2.png";

function UpdateSupplier() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [supplier, setSupplier] = useState({
    name: "",
    gmail: "",
    age: "",
    address: "",
    contact: "",
  });

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/suppliers/${id}`);
        setSupplier(res.data.supplier);
      } catch (err) {
        console.error(err);
        alert("Error fetching supplier ❌");
      }
    };
    fetchSupplier();
  }, [id]);

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
    else {
      setSupplier({ ...supplier, [name]: value });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/suppliers/${id}`, supplier);
      alert("Supplier updated successfully ✅");
      navigate("/suppliers");
    } catch (err) {
      console.error(err);
      alert("Error updating supplier ❌");
    }
  };

  return (
    <div className="update-supplier-page">
      <div className="update-supplier-logo">
        <img src={logo} alt="Logo" />
      </div>

      <div className="update-form-container">
        <h2>Update Supplier</h2>
        <form onSubmit={handleUpdate}>
          <input type="text" name="name" placeholder="Name" value={supplier.name} onChange={handleChange} required />
          <input type="email" name="gmail" placeholder="Email" value={supplier.gmail} onChange={handleChange} required />
          <input type="text" name="age" placeholder="Age" value={supplier.age} onChange={handleChange} required />
          <input type="text" name="address" placeholder="Address" value={supplier.address} onChange={handleChange} required />
          <input type="text" name="contact" placeholder="Contact" value={supplier.contact} onChange={handleChange} required />
          <button type="submit">Update Supplier</button>
        </form>
        <Link to="/suppliers">⬅ Back to Supplier List</Link>
      </div>
    </div>
  );
}

export default UpdateSupplier;
