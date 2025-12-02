import AdminDashboard from "./AdminDashboard";
import StudentDashboard from "./StudentDashboard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [result, setResult] = useState("");

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedUser) return navigate("/");
    setUser(loggedUser);
  }, [navigate]);

  if (!user) return <h3>Loading...</h3>;

  const token = localStorage.getItem("token");

  const accessStudent = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/student-features", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResult("Student Features: " + res.data.features.join(", "));
    } catch (e) {
      setResult(e.response?.data?.message || "Error");
    }
  };

  const accessAdmin = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/admin-features", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResult("Admin Features: " + res.data.features.join(", "));
    } catch (e) {
      setResult(e.response?.data?.message || "Error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome {user?.name || "User"} 👋</h2>

      <p>
        Your role: <b>{user?.role?.toUpperCase()}</b>
      </p>

      <hr />

      {(user?.role === "admin" || user?.role === "Admin") && <AdminDashboard />}
      {(user?.role === "student" || user?.role === "Student") && <StudentDashboard />}

      <hr />

      <div style={{ marginTop: "20px" }}>
        <button onClick={accessAdmin} style={{ marginRight: "10px" }}>
          Admin Features
        </button>
        <button onClick={accessStudent}>Student Features</button>
      </div>

      <p style={{ marginTop: "20px", fontWeight: "bold" }}>{result}</p>
    </div>
  );
}


