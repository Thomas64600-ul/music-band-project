import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import { errorHandler } from "./middlewares/errorHandler.js";


import userRoutes from "./routes/userRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import concertRoutes from "./routes/concertRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import testRoute from "./routes/testRoute.js";

dotenv.config();
const app = express();


app.use(helmet());
app.disable("x-powered-by");


app.use(
  "/api/donations/webhook",
  express.raw({ type: "application/json" }),
  donationRoutes
);


app.use(express.json());
app.use(cookieParser());


app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);


if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}


app.use("/api", testRoute);
app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/concerts", concertRoutes);
app.use("/api/donations", donationRoutes); 
app.use("/api/messages", messageRoutes);


app.use(errorHandler);

export default app;

