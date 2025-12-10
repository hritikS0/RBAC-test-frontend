import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [newProject, setNewProject] = useState({ title: "", description: "" });
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://rbac-test-backend.vercel.app/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      alert("Failed to fetch users: " + (err.response?.data?.message || err.message));
    }
  };

  const createUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const res = await axios.post(
        "https://rbac-test-backend.vercel.app/api/users/register",
        newUser,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const user = res.data.user || res.data;
      setUsers([...users, user]);
      setNewUser({ name: "", email: "", password: "", role: "user" });
      alert("User created successfully!");
    } catch (err) {
      console.error("Error creating user:", err);
      alert("Failed to create user: " + (err.response?.data?.message || err.message));
    }
  };

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

  const deleteProject = async (id) => {
    try {
      await axios.delete(`https://rbac-test-backend.vercel.app/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(projects.filter((p) => p._id !== id));
      alert("Project deleted successfully!");
    } catch (err) {
      console.error("Error deleting project:", err);
      alert("Failed to delete project: " + (err.response?.data?.message || err.message));
    }
  };

  useEffect(() => {
    if (token) {
      fetchUsers();
      fetchProjects();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Admin Dashboard
        </h1>
      </header>

      <section className="mb-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
          Users ({users.length})
        </h2>

        <div className="mb-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="border p-2 rounded-md flex-1"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="border p-2 rounded-md flex-1"
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            className="border p-2 rounded-md flex-1"
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="border p-2 rounded-md"
          >
            <option value="user">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
          <button
            onClick={createUser}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Add User
          </button>
        </div>

        <ul className="space-y-2">
          {users.map((user, index) => (
            <li
              key={user._id || index}
              className="p-3 bg-indigo-50 rounded-md border flex justify-between items-center"
            >
              <div>
                <span className="font-medium">{user.name}</span> - {user.email}{" "}
                - <em>{user.role}</em>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
          Projects ({projects.length})
        </h2>

        <div className="mb-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <input
            type="text"
            placeholder="Title"
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
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Add Project
          </button>
        </div>

        <ul className="space-y-2">
          {projects.map((project, index) => (
            <li
              key={project._id || index}
              className="p-3 bg-white rounded-md border flex justify-between items-center"
            >
              <div>
                <strong>{project.title}</strong> -{" "}
                <span>{project.description}</span>
              </div>
              <button
                onClick={() => deleteProject(project._id)}
                className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
