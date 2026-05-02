import API from "../services/api";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/tasks").then(res => setTasks(res.data));
  }, []);

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "DONE").length;
  const pending = tasks.filter(t => t.status !== "DONE").length;

  const handleLogout = () => {
  localStorage.removeItem("user");
  navigate("/");
};

  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100">
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>

      <div className="flex gap-3">
        <button
  onClick={() => navigate("/projects")}
  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
>
  Projects
</button>

<button
  onClick={() => navigate("/tasks")}
  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
>
  Tasks
</button>
<button
  onClick={handleLogout}
  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
>
  Logout
</button>
      </div>
    </nav>

    {/* 📊 Content */}
    <div className="p-6 max-w-4xl mx-auto">
      
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="bg-blue-100 p-4 rounded-xl shadow text-center">
          <p className="text-sm text-gray-600">Total Tasks</p>
          <h3 className="text-2xl font-bold">{total}</h3>
        </div>

        <div className="bg-green-100 p-4 rounded-xl shadow text-center">
          <p className="text-sm text-gray-600">Completed</p>
          <h3 className="text-2xl font-bold">{completed}</h3>
        </div>

        <div className="bg-yellow-100 p-4 rounded-xl shadow text-center">
          <p className="text-sm text-gray-600">Pending</p>
          <h3 className="text-2xl font-bold">{pending}</h3>
        </div>

      </div>

    </div>
  </div>
);
}

export default Dashboard
