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


app.use(
  cors({
    origin:  "https://insta-clone-by-ankur-frontend.vercel.app", 
    credentials: true,
  })
);


app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);



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
