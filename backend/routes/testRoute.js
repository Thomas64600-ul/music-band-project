import express from "express";
import { sendEmail } from "../services/emailService.js";

const router = express.Router();

router.get("/test-email", async (req, res) => {
  const success = await sendEmail(
    "thomasdetraversay@gmail.com",
    "Test Mailjet ✅",
    "Ceci est un test d’envoi depuis Render via Mailjet."
  );

  if (success) res.json({ message: "Email envoyé avec succès ✅" });
  else res.status(500).json({ error: "Échec de l'envoi ❌" });
});

export default router;
