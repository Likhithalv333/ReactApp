import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

function RegistrationPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleRegistration(event) {
    event.preventDefault();

    // Validation logic goes here
    if (!username || !password || !email) {
      setError("All fields are required.");
      return;
    }

    // Check if username or email already exists
    axios.get(`http://localhost:3500/users?username=${username}&email=${email}`)
      .then(response => {
        const existingUser = response.data[0];
        if (existingUser) {
          setError("Username or email already exists.");
          navigate("/Login")
        } else {
          // Send registration request to the backend
          axios.post("http://localhost:3500/users", {
            username: username,
            password: password,
            email: email
          })
          .then(response => {
            // Registration successful
            alert("Registration successful. You can now log in.");
            navigate("/");
          })
          .catch(error => {
            // Registration failed
            console.error("Registration failed:", error);
            alert("Registration failed. Please try again with different credentials.");
            
          });
        }
      })
      .catch(error => {
        console.error("Error checking existing user:", error);
        setError("Error occurred while checking existing user. Please try again later.");
      });
  }

  return (
    <div className="center">
        <h2>Registration</h2>
        <form onSubmit={handleRegistration} style={{ padding: "20px" }}>
            <div className="txt_field">
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <span></span>
                <label>Username</label>
            </div>
            <div className="txt_field">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <span></span>
                <label>Password</label>
            </div>
            <div className="txt_field">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <span></span>
                <label>Email</label>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit">Register</button>
        </form>
    </div>
);

}

export default RegistrationPage;
