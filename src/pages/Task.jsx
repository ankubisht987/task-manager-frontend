import React, { useEffect, useState } from 'react'
import API from "../services/api";

const Task = () => {

  const role = localStorage.getItem("role"); // ✅ role inside component

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState("");

  const fetchTasks = () => {
    API.get("/tasks").then(res => setTasks(res.data));
  };

  const fetchProjects = () => {
    API.get("/projects").then(res => setProjects(res.data));
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, []);

  // ✅ ADMIN ONLY CREATE TASK
  const createTask = async () => {

    if (role !== "ADMIN") {
      alert("Only Admin can add tasks");
      return;
    }

    if (!projectId) {
      alert("Please select a project");
      return;
    }

    if (!title.trim()) {
      alert("Enter task title");
      return;
    }

    await API.post("/tasks", {
      title,
      description: "New task",
      projectId,
      assignedTo: "user123",
      status: "TODO"
    });

    setTitle("");
    fetchTasks();
  };

  const updateStatus = async (id) => {
    await API.put(`/tasks/${id}`, { status: "DONE" });
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-6 flex justify-center">
      
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6">
        
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Tasks
        </h2>

        {/* ✅ ADMIN ONLY UI */}
        {role === "ADMIN" ? (
          <>
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="w-full border p-2 rounded-lg mb-3"
            >
              <option value="">Select Project</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>

            <div className="flex gap-3 mb-4">
              <input
                placeholder="Task Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="flex-1 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <button
                onClick={createTask}
                disabled={!title || !projectId}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-lg transition disabled:bg-gray-400"
              >
                Add
              </button>
            </div>
          </>
        ) : (
          <p className="text-red-500 text-center mb-4">
            Only Admin can create tasks
          </p>
        )}

        <hr className="my-4" />

        <div className="flex flex-col gap-3">
          {tasks.map(t => (
            <div
              key={t.id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div>
                <p className="font-medium text-gray-800">{t.title}</p>
                <p className={`text-sm ${t.status === "DONE" ? "text-green-600" : "text-yellow-600"}`}>
                  {t.status}
                </p>
              </div>

              <button
                onClick={() => updateStatus(t.id)}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm transition"
              >
                Mark Done
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Task;