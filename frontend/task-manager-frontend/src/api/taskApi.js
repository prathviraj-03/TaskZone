// src/api/taskApi.js

// Fetch tasks from the server
export const fetchTasks = async () => {
    const response = await fetch("API_ENDPOINT/tasks");  // Replace with your API endpoint
    const data = await response.json();
    return data;
  };
  
  // Add a new task
  export const addTask = async (task) => {
    const response = await fetch("API_ENDPOINT/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    return await response.json();
  };
  
  // Update an existing task
  export const updateTask = async (id, updatedTask) => {
    const response = await fetch(`API_ENDPOINT/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });
    return await response.json();
  };
  
  // Delete a task
  export const deleteTask = async (id) => {
    const response = await fetch(`API_ENDPOINT/tasks/${id}`, {
      method: "DELETE",
    });
    return await response.json();
  };
  