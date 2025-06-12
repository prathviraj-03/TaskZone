// src/components/LoginForm.jsx
import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { loginUser } from "../services/api";
import "../styles/LoginForm.css";
import backgroundImage from '../assets/login-bg1.jpg';

const LoginForm = ({ onLogin, onShowRegister }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await loginUser(username, password);
        if (result.success) {
            localStorage.setItem("username", username);
            onLogin(username);
        } else {
            alert("Invalid credentials. Please register if you don't have an account.");
        }
    };

    return (
        <div className="login-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <h1 className="welcome-title">WELCOME TO TASK MANAGER</h1>
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <FaUser className="input-icon" />
                        <input
                            type="text"
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="options">
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href="#">Forgot Password?</a>
                    </div>
                    <button className="login-btn" type="submit">Log in</button>
                    <p className="register-link">
                        Don’t have an account?{" "}
                        <button className="register-btn" type="button" onClick={onShowRegister}>
                            Register
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
