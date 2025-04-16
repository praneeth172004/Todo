import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

export default function AllTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get("/api/todos/todos", {
          withCredentials: true,
        });
        setTodos(res.data.todos || []);
      } catch (err) {
        setError("Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/todos/deletetodo/${id}`, {
        withCredentials: true,
      });
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      setError("Failed to delete todo");
    }
  };

  const handleEdit = (id) => {
    navigate(`/todos/update/${id}`);
  };

  const formatDate = (rawDate) => {
    if (!rawDate) return "-";
    const date = new Date(rawDate);
    return format(date, "dd MMM yyyy, hh:mm a");
  };

  if (loading) return <div className="text-center mt-10 text-lg">Loading todos...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="h-screen p-6 max-w-3xl mx-auto overflow-y-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-amber-600">Your Todos</h2>
      {todos.length === 0 ? (
        <div className="text-center text-gray-600">No todos available.</div>
      ) : (
        <ul className="space-y-4">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="bg-white shadow-md p-5 rounded-xl flex justify-between items-center transition duration-300 hover:shadow-lg"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{todo.title}</h3>
                <p className="text-sm text-gray-500 mt-1">Due: {formatDate(todo.Date)}</p>
              </div>

              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${
                  todo.completed
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {todo.completed ? "Completed" : "Pending"}
              </span>

              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(todo._id)}
                  className="text-blue-600 hover:text-blue-800 font-medium transition"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(todo._id)}
                  className="text-red-600 hover:text-red-800 font-medium transition"
                >
                  🗑️ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
