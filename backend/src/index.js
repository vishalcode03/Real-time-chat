import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import mediaRoutes from "./routes/mediaRoutes.js";

import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

/* =======================
   ✅ CORS — TOP PRIORITY
======================= */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ PRE-FLIGHT FIX (MOST IMPORTANT)
app.options("*", cors());

/* =======================
   ✅ BODY + COOKIES
======================= */
app.use(express.json());
app.use(cookieParser());

/* =======================
   ✅ ROUTES
======================= */
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/media", mediaRoutes);

/* =======================
   ✅ PRODUCTION BUILD
======================= */
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

/* =======================
   ✅ SERVER START
======================= */
server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});