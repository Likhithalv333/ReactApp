import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import './Login.css';

function AdminLogin() {
  const [adminName, setAdminName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const adminLogin = () => {
    if (adminName === "admin" && password === "admin@123") {
      alert("Login Success");
      navigate("/Admin");
    } else {
      setError("Incorrect admin name or password. Please try again.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      adminLogin();
    }
  };

  return (
    <div className="center">
      <h2>Admin Login</h2>
      <form>
        <div className="txt_field">
          <label>Admin Name:</label>
          <input
            type="text"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
          />
        </div>
        <div className="txt_field">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="button" onClick={adminLogin}>Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
