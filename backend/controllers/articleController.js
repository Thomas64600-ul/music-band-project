import {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle
} from "../models/Article.js";

import { sendEmail } from "../services/emailService.js";


export async function addArticle(req, res, next) {
  try {
    const { title, description, content } = req.validatedBody;
    const author_id = req.user?.id;
    const image_url = req.file?.path || null;

    if (!title || !content) {
      return res.status(400).json({ error: "Le titre et le contenu sont requis." });
    }

    const newArticle = await createArticle(title, description, content, image_url, author_id);

   
    await sendEmail(
      process.env.ADMIN_EMAIL,
      "Nouvel article publié",
      `Un nouvel article vient d’être créé par ${req.user.firstname || "un auteur inconnu"}.`,
      "adminNewArticle.html",
      {
        title,
        description: description || "—",
        author: `${req.user.firstname || ""} ${req.user.lastname || ""}`,
        date: new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris", hour12: false }),
      }
    );

    res.status(201).json({
      success: true,
      message: "Article créé avec succès.",
      data: newArticle,
    });
  } catch (error) {
    next(error);
  }
}


export async function fetchArticles(req, res, next) {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    const articles = await getAllArticles(limit, offset);

    res.status(200).json({
      success: true,
      page,
      limit,
      count: articles.length,
      data: articles,
    });
  } catch (error) {
    next(error);
  }
}


export async function fetchArticleById(req, res, next) {
  try {
    const article = await getArticleById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: "Article non trouvé." });
    }

    res.status(200).json({
      success: true,
      data: article,
    });
  } catch (error) {
    next(error);
  }
}


export async function editArticle(req, res, next) {
  try {
    const { title, description, content } = req.validatedBody;
    const image_url = req.file?.path || null;
    const user = req.user;

    const article = await getArticleById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: "Article non trouvé." });
    }

    if (user.role !== "admin" && article.author_id !== user.id) {
      return res.status(403).json({ error: "Non autorisé à modifier cet article." });
    }

    const updated = await updateArticle(req.params.id, title, description, content, image_url);
    if (!updated) {
      return res.status(404).json({ error: "Échec de la mise à jour de l’article." });
    }

    const updatedArticle = await getArticleById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Article mis à jour avec succès.",
      data: updatedArticle,
    });
  } catch (error) {
    next(error);
  }
}


export async function removeArticle(req, res, next) {
  try {
    const user = req.user;
    const article = await getArticleById(req.params.id);

    if (!article) {
      return res.status(404).json({ error: "Article non trouvé." });
    }

    if (user.role !== "admin" && article.author_id !== user.id) {
      return res.status(403).json({ error: "Non autorisé à supprimer cet article." });
    }

    const success = await deleteArticle(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Échec de la suppression de l’article." });
    }

    
    await sendEmail(
      process.env.ADMIN_EMAIL,
      "Article supprimé",
      `Un article vient d’être supprimé.`,
      "adminArticleDeleted.html",
      {
        title: article.title,
        author: `${req.user.firstname || ""} ${req.user.lastname || ""}`,
        date: new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris", hour12: false }),
      }
    );

    res.status(200).json({
      success: true,
      message: "Article supprimé avec succès.",
    });
  } catch (error) {
    next(error);
  }
}






