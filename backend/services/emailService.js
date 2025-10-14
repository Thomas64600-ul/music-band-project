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
    template = template.replace(new RegExp(`{{${key}}}`, "g"), data[key]);
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

    console.log(`Email envoyé à ${to} → Status: ${result.body.Messages[0].Status}`);
    return true;
  } catch (error) {
    console.error("Erreur envoi email :", error.statusCode || "", error.message);
    if (error.response) console.error(error.response.body);
    return false;
  }
}





