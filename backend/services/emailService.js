import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});


function loadTemplate(templateName, data) {
  const templatePath = path.join(process.cwd(), "templates", templateName);
  let template = fs.readFileSync(templatePath, "utf8");

  for (const key in data) {
    template = template.replace(new RegExp(`{{${key}}}`, "g"), data[key]);
  }
  return template;
}

export async function sendEmail(to, subject, text, templateName = null, data = {}) {
  const html = templateName ? loadTemplate(templateName, data) : text;

  try {
    const info = await transporter.sendMail({
      from: `"Music Band Website" <${process.env.MAIL_USER}>`,
      to,
      subject,
      text,
      html
    });

    console.log("Email envoyé:", info.messageId);
    return true;
  } catch (error) {
    console.error("Erreur envoi email:", error);
    return false;
  }
}

