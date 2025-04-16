const express = require("express");
const userRoutes = require("./Routes/userRoutes");
const todoRoutes = require("./Routes/todoRoutes");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser=require("cookie-parser")
const auth=require("./Middleware/auth")
const cors=require("cors");
const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser());
// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use(auth)
app.use("/api/todos", todoRoutes);

// Connect to MongoDB
const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_URL);
        console.log("✅ MongoDB Connected Successfully");
    } catch (err) {
        console.error("❌ Error connecting to MongoDB:", err.message);
        process.exit(1); // Optional: Exit app if DB fails to connect
    }
};

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectdb();
    console.log(`🚀 Server running on port ${PORT}`);
});
