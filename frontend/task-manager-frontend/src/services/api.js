// src/services/api.js
const API_BASE = "http://localhost:8080/api";

export const getTasks = async (username) => {
    const response = await fetch(`${API_BASE}/tasks/${username}`);
    return await response.json();
};

export const addTask = async (username, task) => {
    await fetch(`${API_BASE}/tasks/${username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    });
};

export const updateTask = async (id, task) => {
    await fetch(`${API_BASE}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    });
};

export const deleteTask = async (id) => {
    await fetch(`${API_BASE}/tasks/${id}`, { method: "DELETE" });
};

export const loginUser = async (username, password) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    const text = await response.text();
    return { success: text === "Login successful" };
};

export const registerUser = async (username, email, password) => {
    const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
    });
    const text = await response.text();
    return { success: text === "User registered successfully", message: text };
};
