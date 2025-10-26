import {
  createMessage,
  getAllMessages,
  getMessageById,
  getMessagesByEmail,
  getUnreadMessages,
  markMessageAsRead,
  deleteMessage
} from "../models/Message.js";

import { sendEmail } from "../services/emailService.js";


export async function addMessage(req, res, next) {
  try {
    const { name, email, message } = req.validatedBody;

    const newMessage = await createMessage(name, email, message);

    
    try {
      await sendEmail(
        process.env.ADMIN_EMAIL,
        "🎸 Nouveau message du site Music Band",
        `Message reçu de ${name} (${email}) : ${message}`,
        "adminNotification.html",
        { name, email, message }
      );
      console.log("Email admin envoyé avec succès");
    } catch (mailError) {
      console.warn("Échec d’envoi de l’email admin :", mailError.message);
    }

    
    try {
      await sendEmail(
        email,
        "🎶 Merci pour votre message",
        `Bonjour ${name}, nous avons bien reçu votre message : ${message}`,
        "userConfirmation.html",
        { name, message }
      );
      console.log("Email confirmation envoyé à l’utilisateur");
    } catch (mailError) {
      console.warn("Échec d’envoi de l’email utilisateur :", mailError.message);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
}


export async function fetchMessages(req, res, next) {
  try {
    const messages = await getAllMessages();
    res.json(messages); 
  } catch (error) {
    next(error);
  }
}


export async function fetchUnreadMessages(req, res, next) {
  try {
    const messages = await getUnreadMessages();
    res.json(messages); 
  } catch (error) {
    next(error);
  }
}


export async function fetchMessageById(req, res, next) {
  try {
    const message = await getMessageById(req.params.id);
    if (!message) {
      return res.status(404).json({ error: "Message non trouvé." });
    }
    res.json(message);
  } catch (error) {
    next(error);
  }
}


export async function fetchMessagesByEmail(req, res, next) {
  try {
    const email = req.query.email || req.params.email;
    if (!email) {
      return res.status(400).json({ error: "L'email est requis." });
    }

    const messages = await getMessagesByEmail(email);
    res.json(messages);
  } catch (error) {
    next(error);
  }
}


export async function readMessage(req, res, next) {
  try {
    const success = await markMessageAsRead(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Message non trouvé." });
    }

    const updatedMessage = await getMessageById(req.params.id);
    res.json(updatedMessage);
  } catch (error) {
    next(error);
  }
}


export async function removeMessage(req, res, next) {
  try {
    const success = await deleteMessage(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Message non trouvé." });
    }
    res.json({ message: "Message supprimé avec succès." });
  } catch (error) {
    next(error);
  }
}

