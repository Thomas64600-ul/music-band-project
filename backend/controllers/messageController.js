import {
  createMessage,
  getAllMessages,
  getMessageById,
  getMessagesByEmail,
  markMessageAsRead,
  deleteMessage
} from "../models/Message.js";


export async function addMessage(req, res) {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Tous les champs (name, email, message) sont requis" });
    }

   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Email invalide" });
    }

    const newMessage = await createMessage(name, email, message);
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Erreur ajout message:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}


export async function fetchMessages(req, res) {
  try {
    const messages = await getAllMessages();
    res.json(messages);
  } catch (error) {
    console.error("Erreur récupération messages:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}


export async function fetchMessageById(req, res) {
  try {
    const message = await getMessageById(req.params.id);
    if (!message) {
      return res.status(404).json({ error: "Message non trouvé" });
    }
    res.json(message);
  } catch (error) {
    console.error("Erreur récupération message:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}


export async function fetchMessagesByEmail(req, res) {
  try {
    const messages = await getMessagesByEmail(req.params.email);
    res.json(messages);
  } catch (error) {
    console.error("Erreur récupération messages par email:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function readMessage(req, res) {
  try {
    const success = await markMessageAsRead(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Message non trouvé" });
    }

    const updatedMessage = await getMessageById(req.params.id);
    res.json(updatedMessage);
  } catch (error) {
    console.error("Erreur marquage message comme lu:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}


export async function removeMessage(req, res) {
  try {
    const success = await deleteMessage(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Message non trouvé" });
    }
    res.json({ message: "Message supprimé" });
  } catch (error) {
    console.error("Erreur suppression message:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}
