import {
  addComment,
  getComments,
  deleteComment
} from "../models/Comment.js";


export async function createComment(req, res, next) {
  try {
    const { target_type, target_id, content } = req.body;
    const user_id = req.user.id;

    if (!target_type || !target_id || !content) {
      return res.status(400).json({ error: "Champs manquants." });
    }

    
    const allowedTypes = ["article", "concert", "music"];
    if (!allowedTypes.includes(target_type)) {
      return res.status(400).json({ error: "Type de contenu invalide." });
    }

    const newComment = await addComment(user_id, target_type, target_id, content);
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
}


export async function fetchComments(req, res, next) {
  try {
    const { targetType, targetId } = req.params;
    const allowedTypes = ["article", "concert", "music"];
    if (!allowedTypes.includes(targetType)) {
      return res.status(400).json({ error: "Type de contenu invalide." });
    }

    const comments = await getComments(targetType, targetId);
    res.json(comments);
  } catch (error) {
    next(error);
  }
}


export async function removeComment(req, res, next) {
  try {
    const commentId = req.params.id;
    const user_id = req.user.id;
    const role = req.user.role;

    const success = await deleteComment(commentId, user_id, role);
    if (!success) {
      return res.status(403).json({ error: "Non autorisé à supprimer ce commentaire." });
    }

    res.json({ message: "Commentaire supprimé avec succès." });
  } catch (error) {
    next(error);
  }
}
