import {
  createMessage,
  getAllMessages,
  getMessageById,
  getMessagesByEmail,
  markMessageAsRead,
  deleteMessage
} from "../models/Message.js";


export async function addMessage(req, res, next) {
  try {
    const { name, email, message } = req.validatedBody; 

    const newMessage = await createMessage(name, email, message);
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

