import {
  createMessage,
  getAllMessages,
  getMessageById,
  getMessagesByEmail,
  markMessageAsRead,
  deleteMessage
} from "../models/Message.js";
import { sendEmail } from "../services/emailService.js"; 


export async function addMessage(req, res, next) {
  try {
    const { name, email, message } = req.validatedBody;

    const newMessage = await createMessage(name, email, message);

    
    await sendEmail(
      process.env.ADMIN_EMAIL,
      "Nouveau message du site Music Band",
      `Message reçu de ${name} (${email}): ${message}`,
      "adminNotification.html",
      { name, email, message }
    );

    // Email de confirmation à l’utilisateur
    await sendEmail(
      email,
      "Merci pour votre message",
      `Bonjour ${name}, nous avons bien reçu votre message : ${message}`,
      "userConfirmation.html",
      { name, message }
    );

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

export async function fetchMessageById(req, res, next) {
  try {
    const message = await getMessageById(req.params.id);
    if (!message) {
      return res.status(404).json({ error: "Message non trouvé" });
    }
    res.json(message);
  } catch (error) {
    next(error);
  }
}

export async function fetchMessagesByEmail(req, res, next) {
  try {
    const messages = await getMessagesByEmail(req.params.email);
    res.json(messages);
  } catch (error) {
    next(error);
  }
}

export async function readMessage(req, res, next) {
  try {
    const success = await markMessageAsRead(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Message non trouvé" });
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
      return res.status(404).json({ error: "Message non trouvé" });
    }
    res.json({ message: "Message supprimé" });
  } catch (error) {
    next(error);
  }
}


