import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { getTasks } from "./services/api";
import "./App.css";
import { motion } from "framer-motion";

const App = () => {
  const [username, setUsername] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    if (username) {
      fetchTasks();
    }
  }, [username]);

  const fetchTasks = async () => {
    const fetchedTasks = await getTasks(username);
    setTasks(fetchedTasks);
  };

  return (
    <div className="App">
      {!username ? (
        <motion.div
          className="auth-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {showRegister ? (
            <RegisterForm onRegister={() => setShowRegister(false)} />
          ) : (
            <>
              <LoginForm
                onLogin={(uname) => setUsername(uname)}
                onShowRegister={() => setShowRegister(true)}
              />
              <p className="switch-form">
                Don't have an account?{" "}
                <button onClick={() => setShowRegister(true)}>Register</button>
              </p>
              <p className="skip-login">
                <button onClick={() => setUsername("Guest")}>
                  Continue without login
                </button>
              </p>
            </>
          )}
        </motion.div>
      ) : (
        <Dashboard username={username} tasks={tasks} setTasks={setTasks} fetchTasks={fetchTasks} />
      )}
    </div>
  );
};

export default App;
