import fs from "fs";
import path from "path";
import Mailjet from "node-mailjet";
import dotenv from "dotenv";

dotenv.config();

// === CONFIGURATION MAILJET ===
const mailjet = Mailjet.apiConnect(
  process.env.MAIL_USER,   // clé publique (remplace MJ_APIKEY_PUBLIC)
  process.env.MAIL_PASS    // clé privée (remplace MJ_APIKEY_PRIVATE)
);

// === CHARGEMENT DES TEMPLATES ===
function loadTemplate(templateName, data) {
  const templatePath = path.join(process.cwd(), "templates", templateName);
  let template = fs.readFileSync(templatePath, "utf8");

  for (const key in data) {
    template = template.replace(new RegExp(`{{${key}}}`, "g"), data[key]);
  }
  return template;
}

// === ENVOI D'EMAIL ===
export async function sendEmail(to, subject, text, templateName = null, data = {}) {
  const html = templateName ? loadTemplate(templateName, data) : `<p>${text}</p>`;

  try {
    const result = await mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: "no-reply@musicband.com",
              Name: "Music Band Website",
            },
            To: [{ Email: to }],
            Subject: subject,
            TextPart: text,
            HTMLPart: html,
          },
        ],
      });

    console.log("✅ Email envoyé :", result.body.Messages[0].Status);
    return true;
  } catch (error) {
    console.error("❌ Erreur envoi email :", error.message);
    return false;
  }
}




