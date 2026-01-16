import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import "./AdminRegister.css";

function AdminRegister() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({ gmail: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/admin/register", admin);
      setMessage(res.data.message);
      setTimeout(() => navigate("/"), 2000); // redirect to Home page login
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="admin-register-page">
      <div className="admin-register-card">
        <h2>Register Admin</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="gmail"
            placeholder="Admin Email"
            value={admin.gmail}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={admin.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default AdminRegister;
