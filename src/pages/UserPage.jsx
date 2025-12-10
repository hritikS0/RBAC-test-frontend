import React, { useEffect, useState } from "react";
import axios from "axios";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem("token"); // JWT from login

  // Fetch user info
  const fetchUser = async () => {
    try {
      const res = await axios.get("https://rbac-test-backend.vercel.app/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user info:", err);
    }
  };

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const res = await axios.get("https://rbac-test-backend.vercel.app/api/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Make sure res.data is an array
      setProjects(res.data || []); 
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
      fetchProjects();
    }
  }, [token]);

  if (!user) return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <p className="text-xl text-gray-600">Loading profile data...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Welcome, {user.name.split(' ')[0] || "User"}!
        </h1>
        <p className="text-gray-500">Your personalized dashboard and project overview.</p>
      </header>

      {/* User Info Card */}
      <section className="mb-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
          👤 Profile Information
        </h2>
        <div className="space-y-3">
          <p className="flex justify-between items-center py-2 border-b">
            <strong className="text-gray-600 font-medium">Full Name:</strong> 
            <span className="text-gray-800">{user.name}</span>
          </p>
          <p className="flex justify-between items-center py-2 border-b">
            <strong className="text-gray-600 font-medium">Email:</strong> 
            <span className="text-blue-600 font-mono">{user.email}</span>
          </p>
          <p className="flex justify-between items-center pt-2">
            <strong className="text-gray-600 font-medium">Role:</strong> 
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                user.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}>
              {user.role.toUpperCase()}
            </span>
          </p>
        </div>
      </section>

      {/* Projects Section Card */}
      <section className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
          🗄️ Projects Overview ({projects.length})
          <span className="ml-3 text-sm font-normal text-gray-400">(Read-Only Access)</span>
        </h2>
        
        {projects.length === 0 ? (
          <p className="text-gray-500 italic p-4 bg-gray-50 rounded-lg">
            No projects are currently available for viewing.
          </p>
        ) : (
          <ul className="space-y-4">
            {projects.map((project) => (
              <li key={project._id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition duration-150">
                <strong className="text-lg text-gray-900 block">{project.title}</strong> 
                <p className="text-sm text-gray-600 mt-1">{project.description}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default UserPage;