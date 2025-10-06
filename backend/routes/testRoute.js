import Mailjet from "node-mailjet";
import dotenv from "dotenv";
dotenv.config();

const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

export async function sendEmail(to, subject, text) {
  try {
    const result = await mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: "thomas@votredomaine.com",
              Name: "Music Band",
            },
            To: [{ Email: to }],
            Subject: subject,
            TextPart: text,
          },
        ],
      });

    console.log("✅ Mailjet email envoyé :", result.body);
    return true;
  } catch (err) {
    console.error("❌ Erreur envoi Mailjet :", err.message);
    return false;
  }
}

