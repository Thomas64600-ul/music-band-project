import express from "express";

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Backend opérationnel",
    env: process.env.NODE_ENV,
    time: new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" }),
  });
});

router.get("/cookies", (req, res) => {
  res.json({
    success: true,
    message: "Cookies reçus par le serveur",
    cookies: req.cookies || {},
  });
});

import { protect } from "../middlewares/authMiddleware.js";
router.get("/secure", protect, (req, res) => {
  res.json({
    success: true,
    message: "Accès autorisé à la route sécurisée",
    user: req.user,
  });
});

export default router;
