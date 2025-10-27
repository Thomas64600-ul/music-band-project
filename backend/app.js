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

dotenv.config();
const app = express();

app.set("trust proxy", 1);
app.disable("x-powered-by");

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); 

      const normalized = origin.toLowerCase();
      const allowed =
        normalized.includes("vercel.app") ||
        normalized.includes("localhost") ||
        normalized.includes("render.com") ||
        normalized === process.env.CLIENT_URL?.toLowerCase();

      if (allowed) {
        callback(null, true);
      } else {
        console.warn("CORS refusé pour :", origin);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

console.log("🌍 CORS configuré avec succès");

app.use(compression());
app.use(morgan(process.env.NODE_ENV !== "production" ? "dev" : "combined"));

app.use(
  helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'self'"],
        "script-src": [
          "'self'",
          "'unsafe-inline'",
          "https://js.stripe.com",
          "https://vercel.live", 
        ],
        "connect-src": [
          "'self'",
          "https://api.stripe.com",
          "https://vercel.live",
          "https://*.vercel.app",
          process.env.CLIENT_URL || "http://localhost:5173",
          process.env.RENDER_EXTERNAL_URL || "https://music-band-project.onrender.com",
        ],
        "img-src": [
          "'self'",
          "data:",
          "blob:",
          "https://res.cloudinary.com",
        ],
        "style-src": ["'self'", "'unsafe-inline'"],
        "frame-src": ["https://js.stripe.com"],
      },
    },
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

app.use(
  "/api/donations/webhook",
  express.raw({ type: "application/json" }),
  donationRoutes
);

if (process.env.NODE_ENV !== "production") {
  const { default: testRoute } = await import("./routes/testRoute.js");
  app.use("/api", testRoute);

  app.get("/api/debug/cookies", (req, res) => {
    res.json({ cookies: req.cookies || {} });
  });
}

app.use(errorHandler);

export default app;




