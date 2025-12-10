import React, { useEffect, useState } from "react";
import axios from "axios";
// Assuming you'll add navigation/logout functionality later

const ManagerPage = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: "", description: "" });
  const token = localStorage.getItem("token");

 
  const fetchUser = async () => {
    try {
      const res = await axios.get("https://rbac-test-backend.vercel.app/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch all users (manager/admin)
  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://rbac-test-backend.vercel.app/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      const res = await axios.get("https://rbac-test-backend.vercel.app/api/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Create new project
  const createProject = async () => {
    try {
      const res = await axios.post(
        "https://rbac-test-backend.vercel.app/api/projects",
        newProject,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProjects([...projects, res.data]);
      setNewProject({ title: "", description: "" });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchUsers();
    fetchProjects();
  }, []);


  if (!user) return <div className="text-center p-10 text-xl">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <header className="mb-8 border-b pb-4 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-gray-800">
          Manager Dashboard
        </h1>
        {/* Placeholder for Logout Button */}
        {/* <button className="text-sm text-red-600 hover:text-red-800">Logout</button> */}
      </header>

      {/* Profile Card */}
      <section className="mb-8 p-6 bg-white rounded-lg shadow-lg border-l-4 border-blue-500">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
          <p>
            <strong className="text-gray-800">Name:</strong> {user.name}
          </p>
          <p>
            <strong className="text-gray-800">Email:</strong> {user.email}
          </p>
          <p>
            <strong className="text-gray-800">Role:</strong> 
            <span className="ml-2 px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                {user.role}
            </span>
          </p>
        </div>
      </section>

      {/* Users List */}
      <section className="mb-8 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 border-b pb-2">
          Team Members ({users.length})
        </h2>
        <ul className="space-y-3">
          {users.map((u) => (
            <li key={u._id} className="p-3 bg-gray-50 rounded-md border border-gray-200 flex justify-between items-center text-sm">
              <div>
                <span className="font-medium text-gray-900">{u.name}</span> -
                <span className="text-gray-600 ml-1">{u.email}</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  u.role === 'admin' ? 'bg-red-200 text-red-800' : 
                  u.role === 'manager' ? 'bg-yellow-200 text-yellow-800' :
                  'bg-green-200 text-green-800'
              }`}>
                {u.role}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Projects */}
      <section className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 border-b pb-2">
          Projects ({projects.length})
        </h2>

        {/* Create new project */}
        <div className="mb-6 p-4 border rounded-lg flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 bg-indigo-50">
          <input
            type="text"
            placeholder="Title"
            value={newProject.title}
            onChange={(e) =>
              setNewProject({ ...newProject, title: e.target.value })
            }
            className="border p-2 rounded-md flex-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="text"
            placeholder="Description"
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
            className="border p-2 rounded-md flex-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            onClick={createProject}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 transition duration-150 ease-in-out"
          >
            Add Project
          </button>
        </div>

        {/* Projects List */}
        <ul className="space-y-3">
          {projects.map((project) => (
            <li key={project._id} className="p-4 bg-white rounded-md border flex justify-between items-center transition hover:shadow-sm">
              <div className="flex-1 mr-4">
                <strong className="text-base text-gray-800 block">{project.title}</strong>
                <span className="text-sm text-gray-500">{project.description}</span>
              </div>
              {/* Optional: Add a button for editing/deleting here if manager role allows */}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ManagerPage;