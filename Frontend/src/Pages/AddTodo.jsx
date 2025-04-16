import React, { useState } from "react";
import axios from "axios";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [completed, setCompleted] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !date || !time) {
      setMessage("Title, Date, and Time are required");
      return;
    }

    const dateTime = `${date}T${time}`;

    try {
      const res = await axios.post(
        "/api/todos/addtodo",
        { title, Date: dateTime, completed },
        { withCredentials: true }
      );

      setMessage(res.data.msg);
      setTitle("");
      setDate("");
      setTime("");
      setCompleted(false);
    } catch (error) {
      setMessage(error.response?.data?.error || "Failed to add todo");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-[400px]">
        <h2 className="text-2xl font-bold mb-4 text-center text-amber-600">Add New Todo</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
            Mark as Completed
          </label>

          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            Add Todo
          </button>

          {message && (
            <p className="text-center text-sm text-red-500">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
