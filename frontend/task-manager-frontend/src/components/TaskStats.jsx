import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskStats = ({ tasks }) => {
  const completed = tasks.filter(t => t.status === "Completed").length;
  const pending = tasks.filter(t => t.status === "Pending").length;
  const inProgress = tasks.filter(t => t.status === "In Progress").length;

  const pieData = {
    labels: ['Completed', 'Pending', 'In Progress'],
    datasets: [
      {
        label: 'Tasks',
        data: [completed, pending, inProgress],
        backgroundColor: ['#00BFA6', '#6C63FF', '#FF914D'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="task-stats">
      <h2>Task Overview</h2>

      <div className="charts-responsive">
        <div className="chart-box">
          <h3>Status Distribution</h3>
          <Pie data={pieData} />
        </div>

        <div className="summary-box">
          <h3>Status Summary </h3>
          <div className="status-list">
            <div className="status-card completed">
              <span>✅ Completed : </span>
              <strong>{completed}</strong>
            </div>
            <div className="status-card inprogress">
              <span>🔄 In Progress : </span>
              <strong>{inProgress}</strong>
            </div>
            <div className="status-card pending">
              <span>⏳ Pending : </span>
              <strong>{pending}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStats;
