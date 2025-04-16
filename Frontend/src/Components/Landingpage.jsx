import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext"; // Make sure your AuthContext exports this

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext(); // or pass this as a prop if you're lifting state

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/todos/alltodos");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 flex items-center justify-center px-6">
      <div className="max-w-xl text-center bg-white p-10 rounded-2xl shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-amber-600">Welcome to TodoZen</h1>
        <p className="text-gray-700 text-lg mb-8">
          Organize your day, track your progress, and stay productive with TodoZen — your personal
          task manager built with speed and simplicity in mind.
        </p>

        <button
          onClick={handleGetStarted}
          className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
