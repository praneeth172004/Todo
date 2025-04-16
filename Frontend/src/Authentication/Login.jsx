import React, { useState } from "react";
import { useAuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosConfig";

export default function Login() {
  const { setIsAuthenticated, setUser } = useAuthContext();
  const [islogged,setislogged]=useState(false)
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error

    try {
      // Step 1: Login Request
      const res = await axiosInstance.post("/api/users/login", form, {
        withCredentials: true, // Ensure cookies are sent with request
      });

      if (res.status === 200) {
        setIsAuthenticated(true); // Set the user as authenticated
        
        // Step 2: Fetch user details
        const userRes = await axiosInstance.get("/api/users/details", {
          withCredentials: true,
        });

        if (userRes.status === 200) {
          setUser(userRes.data.user); // Set user data in context
          navigate("/userdetails"); // Redirect to user details page
        }
      }
    } catch (err) {
      setIsAuthenticated(false); // Set authentication to false on error
      if (err.response?.data?.msg) {
        setError(err.response.data.msg); // Show error message from backend
      } else {
        setError("Something went wrong, please try again."); // Generic error message
      }
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="rounded-2xl shadow-lg p-8 w-[350px] flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-center text-black">Login</h1>

        {/* Error Message Display */}
        {error && <p className="text-red-500 text-center text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-black mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="p-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-black mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="p-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
