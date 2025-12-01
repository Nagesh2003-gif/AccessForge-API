import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const response = await axios.post(
  "http://localhost:4000/api/v1/signup",
  formData,
  {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  }
);


      setMessage(response.data.message);
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h2>Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={styles.input}
          required
        >
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" style={styles.button}>Register</button>

        {message && <p style={styles.msg}>{message}</p>}
      </form>
    </div>
  );
};

// simple inline styles
const styles = {
  container: { display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" },
  card: { width: "340px", padding: "25px", borderRadius: "8px", boxShadow: "0px 0px 8px #bbb", display: "flex", flexDirection: "column", gap: "12px" },
  input: { padding: "10px", borderRadius: "4px", border: "1px solid gray" },
  button: { padding: "10px", background: "blue", border: "none", color: "white", fontSize: "16px", borderRadius: "5px", cursor: "pointer" },
  msg: { marginTop: "5px", textAlign: "center" },
};

export default Register;
