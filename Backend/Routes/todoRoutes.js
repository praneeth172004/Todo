const express = require("express");
const {
    Alltodos,
    Addtodo,
    deletetodo,
    particulartodo,
    updatetodo,
    getTodoById
} = require("../Controllers/userTodo");

const router = express.Router();

router.get("/todos", Alltodos);

router.post("/addtodo", Addtodo);

router.get("/todo/:id", particulartodo);

router.put("/update/:id", updatetodo);

router.delete("/deletetodo/:id", deletetodo);

router.get("/todos/:id",getTodoById)

module.exports = router;
