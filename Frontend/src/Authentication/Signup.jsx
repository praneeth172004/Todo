import React, { useState } from 'react';
import axiosInstance from "../api/axiosConfig";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      const res = await axiosInstance.post("/api/users/signup", {
        name: formData.name, // or username if your backend expects it
        email: formData.email,
        password: formData.password
      });
      console.log(res.data.msg);
      
      setMessage(res.data.msg || "Signup successful");
      navigate("/login"); // Redirect to login after signup
    } catch (error) {
      console.log(error);
      
      setMessage(error.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="rounded-2xl shadow-lg p-8 w-[350px] flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-center text-black">Signup</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium text-black mb-1">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="p-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-black mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="p-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-black mb-1">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="p-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            Signup
          </button>

          {message && <p className="text-center text-sm text-red-600 mt-2">{message}</p>}
        </form>
      </div>
    </div>
  );
}
