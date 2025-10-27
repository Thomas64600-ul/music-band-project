import {
  addComment,
  getComments,
  deleteComment,
  updateComment
} from "../models/Comment.js";

export async function createComment(req, res, next) {
  try {
    const { target_type, target_id, content } = req.body;
    const user_id = req.user.id;

    if (!target_type || !target_id || !content) {
      return res.status(400).json({ error: "Champs manquants." });
    }

    const normalizedType = target_type.toLowerCase().replace(/s$/, "");
    const allowedTypes = ["article", "concert", "music"];

    if (!allowedTypes.includes(normalizedType)) {
      return res.status(400).json({ error: "Type de contenu invalide." });
    }

    const newComment = await addComment(user_id, normalizedType, target_id, content);
    res.status(201).json({ data: newComment });
  } catch (error) {
    console.error("Erreur création commentaire :", error);
    next(error);
  }
}

export async function fetchComments(req, res, next) {
  try {
    const { targetType, targetId } = req.params;
    if (!targetType || !targetId)
      return res.status(400).json({ error: "Paramètres manquants." });

    const normalizedType = targetType.toLowerCase().replace(/s$/, "");
    const allowedTypes = ["article", "concert", "music"];
    if (!allowedTypes.includes(normalizedType))
      return res.status(400).json({ error: "Type de contenu invalide." });

    const comments = await getComments(normalizedType, targetId);
    res.json({ data: comments });
  } catch (error) {
    console.error("Erreur récupération commentaires :", error);
    next(error);
  }
}

export async function fetchAllComments(req, res, next) {
  try {
    const comments = await getComments();
    res.json({ data: comments });
  } catch (error) {
    console.error("Erreur récupération tous commentaires :", error);
    next(error);
  }
}

export async function editComment(req, res, next) {
  try {
    const commentId = req.params.id;
    const user_id = req.user.id;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Le contenu du commentaire est requis." });
    }

    const updatedComment = await updateComment(commentId, user_id, content);

    if (!updatedComment) {
      return res
        .status(403)
        .json({ error: "Non autorisé à modifier ce commentaire ou commentaire introuvable." });
    }

    res.json({ data: updatedComment });
  } catch (error) {
    console.error("Erreur mise à jour commentaire :", error);
    next(error);
  }
}

export async function removeComment(req, res, next) {
  try {
    const commentId = req.params.id;
    const user_id = req.user.id;
    const role = req.user.role;

    const success = await deleteComment(commentId, user_id, role);
    if (!success)
      return res
        .status(403)
        .json({ error: "Non autorisé à supprimer ce commentaire." });

    res.json({ message: "Commentaire supprimé avec succès." });
  } catch (error) {
    console.error("Erreur suppression commentaire :", error);
    next(error);
  }
}


