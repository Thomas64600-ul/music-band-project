import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler.js";

import userRoutes from "./routes/userRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import concertRoutes from "./routes/concertRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/concerts", concertRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/messages", messageRoutes);


app.use(errorHandler);

export default app;
