import express from "express";
import { sendEmail } from "../services/emailService.js";

const router = express.Router();

router.post("/test-email", async (req, res) => {
  const success = await sendEmail(
    "tonadresse@gmail.com",
    "Test Mailjet ✅",
    "Ceci est un test via Mailjet API depuis Render."
  );
  if (success) {
    res.json({ message: "✅ Email envoyé avec succès !" });
  } else {
    res.status(500).json({ message: "❌ Échec de l’envoi." });
  }
});

export default router;


