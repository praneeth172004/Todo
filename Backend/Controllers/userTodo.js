const { Todo } = require("../Database/todo");
const mongoose = require("mongoose");
const getTodoById = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.userId;
  
      // Validate Object ID
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ msg: "Invalid todo ID" });
      }
  
      // Find the todo by ID
      const todo = await Todo.findOne({ _id: id, userId });
      if (!todo) {
        return res.status(404).json({ msg: "Todo not found or access denied" });
      }
      console.log(todo);
      
      res.status(200).json({ todo });
    } catch (err) {
      console.error("getTodoById Error:", err);
      res.status(500).json({ error: "Error fetching todo" });
    }
  };
  
// Create a new todo
const Addtodo = async (req, res) => {
    try {
        const { title, Date, completed } = req.body;
        const userId = req.userId;

        if (!title || !Date || typeof completed !== "boolean") {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const newTodo = await Todo.create({ title, Date, completed, userId });

        return res.status(201).json({
            msg: "New todo added successfully",
            newTodo
        });

    } catch (err) {
        console.error("Addtodo Error:", err);
        res.status(500).json({ error: "Error while adding todo" });
    }
};

// Get all todos of logged-in user
const Alltodos = async (req, res) => {
    try {
        const userId = req.userId;
        const todos = await Todo.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json({ todos });
    } catch (err) {
        console.error("Alltodos Error:", err);
        res.status(500).json({ error: "Error fetching todos" });
    }
};

// Get a single todo by ID (only if owned by user)
const particulartodo = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ msg: "Invalid todo ID" });
        }

        const singleTodo = await Todo.findOne({ _id: id, userId });
        if (!singleTodo) {
            return res.status(404).json({ msg: "Todo not found or access denied" });
        }

        res.status(200).json({ singleTodo });
    } catch (err) {
        console.error("particulartodo Error:", err);
        res.status(500).json({ error: "Error fetching the todo" });
    }
};

// Update a todo (only if owned by user)
const updatetodo = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ msg: "Invalid todo ID" });
        }

        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: id, userId },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ msg: "Todo not found or access denied" });
        }

        res.status(200).json({
            msg: "Todo updated successfully",
            updatedTodo
        });
    } catch (err) {
        console.error("updatetodo Error:", err);
        res.status(500).json({ error: "Error updating todo" });
    }
};

// Delete a todo (only if owned by user)
const deletetodo = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ msg: "Invalid todo ID" });
        }

        const deleted = await Todo.findOneAndDelete({ _id: id, userId });

        if (!deleted) {
            return res.status(404).json({ msg: "Todo not found or access denied" });
        }

        res.status(200).json({
            msg: "Todo deleted successfully",
            deleted
        });
    } catch (err) {
        console.error("deletetodo Error:", err);
        res.status(500).json({ error: "Error deleting todo" });
    }
};

module.exports = {
    Addtodo,
    Alltodos,
    updatetodo,
    deletetodo,
    particulartodo,
    getTodoById
};
