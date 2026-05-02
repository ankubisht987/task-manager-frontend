import React, { useEffect, useState } from 'react'
import API from "../services/api";


const Projects = () => {

  const role = localStorage.getItem("role");
  
  const [projects, setProjects] = useState([]); // plural is better
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const fetchProject = () => {
    API.get("/projects").then(res => setProjects(res.data));
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const createProject = async () => {
    if (!name) {
      alert("Enter project name");
      return;
    }

    await API.post("/projects", {   // fixed endpoint
      name,
      description,
      createdBy: 'user123'
    });

    setName("");
    setDescription("");
    fetchProject();
  };

return (
  <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex justify-center p-6">
    
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6">
      
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Projects
      </h2>

      <div className="flex flex-col gap-3 mb-4">
        <input
          placeholder="Project Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <input
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {role === "ADMIN" && (
        <button
          onClick={createProject}
          className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-lg transition"
        >
          Create Project
        </button>
        )}
      </div>
      {role !== "ADMIN" && (
        <p className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-lg transition">
          Only Admin can create projects
        </p>
        )}
      

      <hr className="my-4" />

      <div className="flex flex-col gap-3">
        {projects.map(p => (
          <div
            key={p.id}
            className="bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <p className="font-semibold text-gray-800">{p.name}</p>
          </div>
        ))}
      </div>

    </div>
  </div>
);
};

export default Projects;