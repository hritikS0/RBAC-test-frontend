import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://rbac-test-backend.vercel.app/api/users/register",
        formData
      );

      setMessage("User registered successfully! Redirecting...");
      
      // Delay navigation slightly to show success message
      setTimeout(() => {
          // Navigate based on role
          if (formData.role === "admin") navigate("/admin");
          else if (formData.role === "manager") navigate("/manager");
          else navigate("/user");
      }, 1000);

      console.log(res.data);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-200"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Create Account
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-4 transition duration-150 ease-in-out"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-4 transition duration-150 ease-in-out"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-4 transition duration-150 ease-in-out"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="appearance-none relative block w-full px-3 py-3 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-6 transition duration-150 ease-in-out bg-white"
        >
          <option value="user">User (Default)</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        >
          Register
        </button>

        {message && (
          <p className={`mt-4 text-center text-sm font-medium p-2 rounded ${
            message.includes('successfully') 
              ? 'bg-green-100 text-green-700 border border-green-300' 
              : 'bg-red-100 text-red-700 border border-red-300'
          }`}>
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;