import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Login.css';
import Cookies from 'js-cookie';

function Login() {
    const [uname, setUname] = useState("");
    const [password, setPassword] = useState("");
    const [result, setResult] = useState("");
    const navigate = useNavigate();

    function loginClick() {
        const url = `http://localhost:3500/users?username=${uname}`;
        axios.get(url)
            .then(response => {
                const user = response.data[0];
                if (user) {
                    if (user.password === password) {
                        sessionStorage.setItem("USER_ID", uname);
                        navigate("/"); // Navigate to the ShoppingCart page
                    } else {
                        setResult("Invalid username or password");
                    }
                } else {
                    alert("User does not exist. Please create an account.");
                    setTimeout(() => {
                        navigate("/RegistrationPage");
                    }, 100); // Delay navigation to give time for the alert to be displayed
                }
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
                setResult("Error occurred. Please try again later.");
            });
    }
    

    return (
        <>
            <div className="center">
                <form style={{ padding: "20px" }}>
                    <h1>User Login</h1>
                    <div className="txt_field">
                        <input type="text" value={uname} onChange={(e) => setUname(e.target.value)} />
                        <span></span>
                        <label>Username</label>
                    </div>
                    <div className="txt_field">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <span></span>
                        <label>Password</label>
                    </div>
                    <input type="button" onClick={loginClick} value="Login" />
                    <p style={{ color: "red" }}>{result}</p>
                </form>
            </div>
        </>
    );
}

export default Login;