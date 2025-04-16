import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddTodo from '../Pages/AddTodo';
import AllTodos from '../Pages/AllTodos';
import EditTodo from '../Pages/EditTodo'; // Import your EditTodo component

export default function TodoRoutes() {
  return (
    <Routes>
      <Route path="/add-todo" element={<AddTodo />} />
      <Route path="/alltodos" element={<AllTodos />} />
      {/* Route for editing a specific todo */}
      <Route path="/update/:id" element={<EditTodo />} />
    </Routes>
  );
}
