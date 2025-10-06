import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// === CONFIG MAILJET ===
const transporter = nodemailer.createTransport({
  host: "in-v3.mailjet.com",
  port: 587, // port recommandé
  secure: false, // doit rester false avec le port 587
  auth: {
    user: process.env.MAIL_USER, // clé API publique
    pass: process.env.MAIL_PASS  // clé secrète
  },
});

// === CHARGEMENT DES TEMPLATES ===
function loadTemplate(templateName, data) {
  const templatePath = path.join(process.cwd(), "templates", templateName);
  let template = fs.readFileSync(templatePath, "utf8");

  for (const key in data) {
    template = template.replace(new RegExp(`{{${key}}}`, "g"), data[key]);
  }
  return template;
}

// === ENVOI DE MAIL ===
export async function sendEmail(to, subject, text, templateName = null, data = {}) {
  const html = templateName ? loadTemplate(templateName, data) : `<p>${text}</p>`;

  try {
    const info = await transporter.sendMail({
      from: `"Music Band Website" <no-reply@musicband.com>`, // tu peux laisser comme ça
      to,
      subject,
      text,
      html,
    });

    console.log("✅ Email envoyé :", info.messageId);
    return true;
  } catch (error) {
    console.error("❌ Erreur envoi email :", error);
    return false;
  }
}


