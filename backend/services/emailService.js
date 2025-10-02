import nodemailer from "nodemailer";
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

  @param {string} to 
  @param {string} subject 
  @param {string} text 
  @param {object} data 
 
export async function sendEmail(to, subject, text, data = {}) {
  const html = `
    <div style="font-family: Arial, sans-serif; padding:20px; background:#f9f9f9; border-radius:8px;">
      <h2 style="color:#B3122D;">Nouveau message reçu sur Music Band Website</h2>
      <p><strong>Nom :</strong> ${data.name || "Inconnu"}</p>
      <p><strong>Email :</strong> ${data.email || "Inconnu"}</p>
      <p><strong>Message :</strong></p>
      <div style="padding:10px; background:#fff; border:1px solid #ddd; border-radius:5px;">
        ${data.message || "Pas de contenu"}
      </div>
      <hr style="margin:20px 0;">
      <p style="font-size:12px; color:#666;">Cet email a été généré automatiquement par le site Music Band.</p>
    </div>
  `;

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
