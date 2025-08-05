import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./socket/socket.js";

// 🧪 Config
dotenv.config();
const PORT = process.env.PORT || 8000;

// 🛡️ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ Proper way to parse URL-encoded data
app.use(cookieParser());
app.use(cors({
   origin: [
    "http://localhost:5173", // local dev
    "https://insta-clone-by-ankur-frontend-7dorvl3h7.vercel.app" // deployed frontend
  ], // ✅ Frontend origin
  credentials: true               // ✅ Allow cookies to pass through
}));

// 🚏 API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);

// 🚀 Server start
const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`✅ Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
  }
};

startServer();
