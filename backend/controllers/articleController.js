import {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle
} from "../models/Article.js";


export async function addArticle(req, res, next) {
  try {
    const { title, description, content } = req.body;
    const author_id = req.user.id;
    const image_url = req.file ? req.file.path : null; 

    if (!title || !content) {
      return res.status(400).json({ error: "Titre et contenu sont requis." });
    }

    const newArticle = await createArticle(title, description, content, image_url, author_id);

    res.status(201).json({
      success: true,
      message: "Article créé avec succès.",
      data: newArticle
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

    res.json({
      success: true,
      page,
      limit,
      count: articles.length,
      data: articles
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
    res.json({ success: true, data: article });
  } catch (error) {
    next(error);
  }
}


export async function editArticle(req, res, next) {
  try {
    const { title, description, content, image_url } = req.body;
    const user = req.user;
    const article = await getArticleById(req.params.id);

    if (!article) {
      return res.status(404).json({ error: "Article non trouvé." });
    }

    if (user.role !== "admin" && article.author_id !== user.id) {
      return res.status(403).json({ error: "Non autorisé à modifier cet article." });
    }

    if (!title || !content) {
      return res.status(400).json({ error: "Titre et contenu sont requis." });
    }

    const success = await updateArticle(req.params.id, title, description, content, image_url);
    if (!success) {
      return res.status(404).json({ error: "Article non trouvé." });
    }

    const updatedArticle = await getArticleById(req.params.id);
    res.json({
      success: true,
      message: "Article mis à jour avec succès.",
      data: updatedArticle
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
      return res.status(404).json({ error: "Article non trouvé." });
    }

    res.json({
      success: true,
      message: "Article supprimé avec succès."
    });
  } catch (error) {
    next(error);
  }
}





