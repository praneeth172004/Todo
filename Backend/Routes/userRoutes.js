const express = require("express");
const { userdetails, signup, login, logout } = require("../Controllers/userData");
const auth = require("../Middleware/auth");

const routes = express.Router();

routes.post("/signup", signup);
routes.post("/login", login);
routes.get("/logout", auth, logout);
routes.get("/details", auth, userdetails); // Updated route for user details

module.exports = routes;
