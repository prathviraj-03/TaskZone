import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import TaskStats from "./TaskStats";
import "../styles/Dashboard.css";
import { motion } from "framer-motion";
import { getTasks, addTask, updateTask, deleteTask } from "../services/api";

const Dashboard = () => {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (username) {
      fetchTasks(username);
    }
  }, [username]);

  const fetchTasks = async (user) => {
    try {
      const fetchedTasks = await getTasks(user);
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const handleAddTask = async (newTask) => {
    try {
      await addTask(username, newTask);
      fetchTasks(username);
    } catch (error) {
      console.error("Add task failed:", error);
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      await updateTask(updatedTask.id, updatedTask);
      fetchTasks(username);
    } catch (error) {
      console.error("Update task failed:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      fetchTasks(username);
    } catch (error) {
      console.error("Delete task failed:", error);
    }
  };

  return (
    <motion.div
      className="dashboard"
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 70 }}
    >
      <header className="dashboard-header">
        <h1>Task Manager</h1>
        <div className="user-greeting">👋 Hello, {username}!</div>
      </header>

      <main className="dashboard-main">
        <TaskForm onAddTask={handleAddTask} />
        <TaskList
          tasks={tasks}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
        />
        <TaskStats tasks={tasks} />
      </main>

      <footer className="dashboard-footer">
        © 2025 Task Manager. Built with 💜 by You.
      </footer>
    </motion.div>
  );
};

export default Dashboard;
