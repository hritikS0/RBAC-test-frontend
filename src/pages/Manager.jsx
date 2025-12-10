import React, { useEffect, useState } from "react";
import axios from "axios";

const ManagerPage = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: "", description: "" });
  const token = localStorage.getItem("token");

  const fetchProjects = async () => {
    try {
      const res = await axios.get("https://rbac-test-backend.vercel.app/api/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
      alert("Failed to fetch projects: " + (err.response?.data?.message || err.message));
    }
  };

  const createProject = async () => {
    if (!newProject.title || !newProject.description) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const res = await axios.post(
        "https://rbac-test-backend.vercel.app/api/projects",
        newProject,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const project = res.data.project || res.data;
      setProjects([...projects, project]);
      setNewProject({ title: "", description: "" });
      alert("Project created successfully!");
    } catch (err) {
      console.error("Error creating project:", err);
      alert("Failed to create project: " + (err.response?.data?.message || err.message));
    }
  };

  const updateProject = async (id, updatedData) => {
    try {
      const res = await axios.put(
        `https://rbac-test-backend.vercel.app/api/projects/${id}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProjects(
        projects.map((p) => (p._id === id ? res.data : p))
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProjects();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Manager Dashboard
        </h1>
      </header>

      <section className="mb-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
          Create New Project
        </h2>

        <div className="mb-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <input
            type="text"
            placeholder="Project Title"
            value={newProject.title}
            onChange={(e) =>
              setNewProject({ ...newProject, title: e.target.value })
            }
            className="border p-2 rounded-md flex-1"
          />
          <input
            type="text"
            placeholder="Description"
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
            className="border p-2 rounded-md flex-1"
          />
          <button
            onClick={createProject}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Create Project
          </button>
        </div>
      </section>

      <section className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
          Projects ({projects.length})
        </h2>

        {projects.length === 0 ? (
          <p className="text-gray-500">No projects yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 p-2 text-left">Title</th>
                  <th className="border border-gray-300 p-2 text-left">Description</th>
                  <th className="border border-gray-300 p-2 text-left">Created By</th>
                  <th className="border border-gray-300 p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2">{p.title}</td>
                    <td className="border border-gray-300 p-2">{p.description}</td>
                    <td className="border border-gray-300 p-2">
                      {p.createdBy?.name || "Unknown"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button
                        onClick={() => {
                          const newTitle = prompt("New title:", p.title);
                          if (newTitle) {
                            updateProject(p._id, {
                              title: newTitle,
                              description: p.description,
                            });
                          }
                        }}
                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default ManagerPage;
