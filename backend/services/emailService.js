import fs from "fs";
import path from "path";
import Mailjet from "node-mailjet";
import dotenv from "dotenv";

dotenv.config();


const mailjet = Mailjet.apiConnect(
  process.env.MAIL_USER,  
  process.env.MAIL_PASS    
);


function loadTemplate(templateName, data) {
  const templatePath = path.join(process.cwd(), "templates", templateName);
  let template = fs.readFileSync(templatePath, "utf8");

  for (const key in data) {
    template = template.replace(new RegExp(`{{${key}}}`, "g"), data[key] ?? "");
  }
  return template;
}


export async function sendEmail(to, subject, text, templateName = null, data = {}) {
  const html = templateName ? loadTemplate(templateName, data) : `<p>${text}</p>`;

  try {
    const result = await mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: process.env.ADMIN_EMAIL,
              Name: "Music Band Website",
            },
            To: [{ Email: to }],
            ReplyTo: {
              Email: process.env.ADMIN_EMAIL,
            },
            Subject: subject,
            TextPart: text,
            HTMLPart: html,
          },
        ],
      });

    console.log(`Email envoyé à ${to} → ${result.body.Messages[0].Status}`);
    return true;
  } catch (error) {
    console.error("Erreur envoi email :", error.statusCode || "", error.message);
    if (error.response) console.error(error.response.body);
    return false;
  }
}


export async function sendDonationThankYouEmail(to, firstname, amount) {
  if (!to) {
    console.warn("Don anonyme — aucun email envoyé.");
    return;
  }

  const subject = "Merci pour votre soutien à REVEREN 🎶";
  const text = `Bonjour ${firstname || "Cher soutien"}, merci pour votre don de ${amount} € à REVEREN !`;

  const data = {
    firstname: firstname || "Cher soutien",
    amount,
    siteUrl: process.env.CLIENT_URL || "https://music-band-project-frontend.onrender.com",
  };

  return await sendEmail(to, subject, text, "donationThankYou.html", data);
}


export async function sendAdminNotificationEmail(eventType, details = {}) {
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    console.warn("ADMIN_EMAIL non défini — notification non envoyée.");
    return;
  }

  const subject = `Nouvelle activité sur REVEREN : ${eventType}`;
  const text = `Un nouvel événement a eu lieu sur le site REVEREN : ${eventType}.`;

  const data = {
    event_type: eventType,
    name: details.name || "Utilisateur inconnu",
    email: details.email || "Non précisé",
    message: details.message || "Aucun message fourni",
    amount: details.amount ? `${details.amount} €` : "N/A",
    date: new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" }),
  };

  return await sendEmail(adminEmail, subject, text, "adminNotification.html", data);
}








