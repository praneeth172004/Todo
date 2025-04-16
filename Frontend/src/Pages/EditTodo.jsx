import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from "../api/axiosConfig";

export default function EditTodo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [todo, setTodo] = useState({
    title: '',
    Date: '',
    completed: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await axiosInstance.get(`/api/todos/todos/${id}`, { withCredentials: true });
        const fetchedTodo = res.data.todo;

        // Format date to YYYY-MM-DD for <input type="date" />
        const formattedDate = new Date(fetchedTodo.Date).toISOString().split('T')[0];

        setTodo({ ...fetchedTodo, Date: formattedDate });
      } catch (err) {
        setError('Failed to fetch todo');
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTodo((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axiosInstance.put(`/api/todos/update/${id}`, todo, {
        withCredentials: true,
      });
      if (res.status === 200) {
        navigate('/todos/alltodos');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update todo');
    }
  };

  if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="h-screen p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-amber-600 mb-8">Edit Todo</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 space-y-6 transition duration-300"
      >
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={todo.title}
            onChange={handleChange}
            className="p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-amber-400 outline-none transition"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="Date" className="text-sm font-medium mb-1">
            Due Date
          </label>
          <input
            type="date"
            id="Date"
            name="Date"
            value={todo.Date}
            onChange={handleChange}
            className="p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-amber-400 outline-none transition"
            required
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="completed"
            name="completed"
            checked={todo.completed}
            onChange={handleChange}
            className="w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-400"
          />
          <label htmlFor="completed" className="text-sm font-medium">
            Mark as Completed
          </label>
        </div>

        <div className="flex gap-4 justify-end">
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Update Todo
          </button>
          <button
            type="button"
            onClick={() => navigate('/todos/alltodos')}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
