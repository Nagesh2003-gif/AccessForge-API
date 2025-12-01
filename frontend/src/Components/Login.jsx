import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/login",
        formData,
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      setMessage("Login Successful!");

      // ⭐ store token
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // ⭐ store user details INCLUDING ROLE (THIS FIXES DASHBOARD)
      if (res.data.user) {
        const { name, role } = res.data.user;
        localStorage.setItem("user", JSON.stringify({ name, role }));
      }

      // ⭐ redirect to dashboard
      setTimeout(() => navigate("/dashboard"), 800);

    } catch (err) {
      setMessage(
        err.response?.data?.message || "Invalid Credentials. Try again."
      );
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>

      {message && <p style={styles.message}>{message}</p>}

      <form onSubmit={submitHandler} style={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={changeHandler}
          required
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={changeHandler}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: "350px",
    margin: "60px auto",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 0px 5px gray",
  },
  title: { textAlign: "center", marginBottom: "20px" },
  message: { textAlign: "center", color: "green", marginBottom: "10px" },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  input: { padding: "10px", borderRadius: "4px", border: "1px solid gray" },
  button: {
    padding: "10px",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "4px",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
  },
};

export default Login;
