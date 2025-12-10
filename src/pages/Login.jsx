import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    const { email, password } = formData;

    try {
      const res = await axios.post("https://rbac-test-backend.vercel.app/api/users/login", { email, password });
      // Store token and role in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      // Redirect based on role
      if (res.data.user.role === "admin") navigate("/admin");
      else if (res.data.user.role === "manager") navigate("/manager");
      else navigate("/user");
    } catch (err) {
      console.log(err);
      setMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Log In
        </h2>

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
          className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-6 transition duration-150 ease-in-out"
        />

        <button
          type="submit"
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        >
          Login
        </button>

        {message && (
          <p className="mt-4 text-center text-sm font-medium p-2 bg-red-100 text-red-700 border border-red-300 rounded">
            {message}
          </p>
        )}
        
        <p className="mt-6 text-center text-sm text-gray-600">
          New here? <Link to="/" className="font-medium text-blue-600 hover:text-blue-500">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
