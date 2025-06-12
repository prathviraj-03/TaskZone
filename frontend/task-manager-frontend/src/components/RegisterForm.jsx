// src/components/RegisterForm.jsx
import React, { useState } from "react";
import { registerUser } from "../services/api";
import "../styles/LoginForm.css"; // Reuse same styles
import backgroundImage from "../assets/login-bg1.jpg";

const RegisterForm = ({ onRegister }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        const result = await registerUser(username, email, password);
        if (result.success) {
            alert("Registration successful! You can now login.");
            onRegister();
        } else {
            alert(result.message || "Registration failed. Try again.");
        }
    };

    return (
        <div className="login-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <h1 className="welcome-title">REGISTER TO TASK MANAGER</h1>
            <div className="login-container">
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="login-btn" type="submit">Register</button>
                    <p className="register-link">
                        Already have an account?{" "}
                        <button type="button" className="register-btn" onClick={onRegister}>
                            Login
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
