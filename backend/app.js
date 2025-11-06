import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import { errorHandler } from "./middlewares/errorHandler.js";

import userRoutes from "./routes/userRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import concertRoutes from "./routes/concertRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import musicRoutes from "./routes/musicRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";

dotenv.config();
const app = express();

app.set("trust proxy", 1);
app.disable("x-powered-by");
app.use(compression());
app.use(morgan(process.env.NODE_ENV !== "production" ? "dev" : "combined"));

app.use(
  helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "img-src": ["'self'", "data:", "blob:", "res.cloudinary.com"],
        "connect-src": [
          "'self'",
          process.env.CLIENT_URL || "http://localhost:5173",
          "https://api.stripe.com",
          "https://res.cloudinary.com",
          "https://music-band-project.onrender.com",
        ],
        "script-src": ["'self'", "'unsafe-inline'", "https://js.stripe.com"],
        "media-src": ["'self'", "data:", "blob:", "res.cloudinary.com"],
      },
    },
  })
);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://music-band-project-five.vercel.app",
      /\.vercel\.app$/,
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "Origin",
      "X-Requested-With",
    ],
    exposedHeaders: ["Set-Cookie"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/concerts", concertRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/musics", musicRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/stats", statsRoutes);

app.use(
  "/api/donations/webhook",
  express.raw({ type: "application/json" }),
  donationRoutes
);

if (process.env.NODE_ENV !== "production") {
  const { default: testRoute } = await import("./routes/testRoute.js");
  app.use("/api", testRoute);

  app.get("/api/debug/cookies", (req, res) => {
    console.log("Cookies reçus :", req.cookies);
    res.json({ cookies: req.cookies || {} });
  });
}

app.use(errorHandler);

export default app;



