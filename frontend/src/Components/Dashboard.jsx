import AdminDashboard from "./AdminDashboard";
import StudentDashboard from "./StudentDashboard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedUser) return navigate("/");
    setUser(loggedUser);
  }, [navigate]);

  if (!user) return <h3>Loading...</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome {user?.name || "User"} 👋</h2>

      <p>
        Your role: <b>{user?.role?.toUpperCase() || "NO ROLE FOUND"}</b>
      </p>

      <hr />

      {user?.role === "admin" || user?.role === "Admin" && <AdminDashboard />}
      {user?.role === "student" || user?.role === "Student" && <StudentDashboard />}
    </div>
  );
}

