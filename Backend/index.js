import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";

import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import aiChatRoute from "./routes/aiChat.route.js";

dotenv.config();

const app = express();

// DB connect
connectDB();

// CORS
app.use(cors({
  origin: "*",
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/user", userRoute);
app.use("/api/company", companyRoute);
app.use("/api/job", jobRoute);
app.use("/api/application", applicationRoute);
app.use("/api/ai", aiChatRoute);

// Test route
app.get("/", (req, res) => {
  res.send("Backend is live on Vercel 🚀");
});

// ❌ NO app.listen
export default app;
