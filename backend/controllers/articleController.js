import {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle
} from "../models/Article.js";


export async function addArticle(req, res, next) {
  try {
    const { title, content, author_id } = req.validatedBody;

    const newArticle = await createArticle(title, content, author_id);
    res.status(201).json(newArticle);
  } catch (error) {
    next(error); 
  }
}

export async function fetchArticles(req, res, next) {
  try {
    const articles = await getAllArticles();
    res.json(articles);
  } catch (error) {
    next(error);
  }
}


export async function fetchArticleById(req, res, next) {
  try {
    const article = await getArticleById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: "Article non trouvé" });
    }
    res.json(article);
  } catch (error) {
    next(error);
  }
}


export async function editArticle(req, res, next) {
  try {
    const { title, content } = req.validatedBody;

    const success = await updateArticle(req.params.id, title, content);
    if (!success) {
      return res.status(404).json({ error: "Article non trouvé" });
    }

    const updatedArticle = await getArticleById(req.params.id);
    res.json(updatedArticle);
  } catch (error) {
    next(error);
  }
}


export async function removeArticle(req, res, next) {
  try {
    const success = await deleteArticle(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Article non trouvé" });
    }
    res.json({ message: "Article supprimé avec succès" });
  } catch (error) {
    next(error);
  }
}


