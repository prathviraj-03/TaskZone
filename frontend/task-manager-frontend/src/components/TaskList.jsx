import React, { useState } from "react";
import "../styles/TaskList.css";

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedStatus, setEditedStatus] = useState("");

    // Start editing the task
    const startEditing = (task) => {
        setEditingTaskId(task.id);
        setEditedTitle(task.title);
        setEditedStatus(task.status);
    };

    // Cancel editing mode
    const cancelEditing = () => {
        setEditingTaskId(null);
        setEditedTitle("");
        setEditedStatus("");
    };

    // Save the edited task
    const saveEditing = () => {
        if (editedTitle && editedStatus) {
            const updatedTask = {
                id: editingTaskId,
                title: editedTitle,
                status: editedStatus,
            };
            onUpdateTask(updatedTask); // Call the function passed from parent to update task
            cancelEditing(); // Reset editing state
        }
    };

    // Mark task as completed
    const markCompleted = (task) => {
        if (task.status !== "Completed") {
            onUpdateTask({ ...task, status: "Completed" });
        }
    };

    return (
        <div className="task-list">
            <h2>Tasks</h2>
            {tasks.length === 0 ? (
                <p>No tasks available.</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            {editingTaskId === task.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editedTitle}
                                        onChange={(e) => setEditedTitle(e.target.value)}
                                    />
                                    <select
                                        value={editedStatus}
                                        onChange={(e) => setEditedStatus(e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                    <button onClick={saveEditing}>Save</button>
                                    <button onClick={cancelEditing}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <span>
                                        {task.title} ({task.status})
                                    </span>
                                    <div className="button-group">
                                        <button onClick={() => startEditing(task)}>Update</button>
                                        <button onClick={() => markCompleted(task)}>Completed</button>
                                        <button onClick={() => onDeleteTask(task.id)}>Delete</button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
