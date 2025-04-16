const { UserModel } = require("../Database/userDb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userdetails = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    console.log("User Details Error:", err);
    res.status(500).json({ error: "Error fetching User Details" });
  }
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({ name, email, password: hashedPassword });

    res.status(201).json({
      msg: "You have successfully signed up",
      user: { id: newUser._id, name: newUser.name },
    });
  } catch (err) {
    console.log("Signup Error:", err);
    res.status(500).json({ error: "Error while signing up" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Incorrect password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.status(200).json({ msg: "Login successful", token });
  } catch (err) {
    console.log("Login Error:", err);
    res.status(500).json({ error: "Error while logging in" });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ msg: "Logout successful" });
};

module.exports = { userdetails, signup, login, logout };
