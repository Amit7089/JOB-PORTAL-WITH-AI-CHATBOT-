import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});
const app = express();


const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://job-portal-with-ai-chatbot.vercel.app/"
  ],
  credentials: true,
};

app.use(cors(corsOptions));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());





// Google Gemini 
import aiChatRoute from "./routes/aiChat.route.js";
app.use("/api/ai", aiChatRoute);


const PORT = process.env.PORT || 5001;

 
//api's

app.use("/api/user", userRoute);
app.use("/api/company", companyRoute);
app.use("/api/job", jobRoute);
app.use("/api/application", applicationRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
