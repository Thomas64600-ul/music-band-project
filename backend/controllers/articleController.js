import {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle
} from "../models/Article.js";


export async function addArticle(req, res) {
  try {
    const { title, content, author_id } = req.body;
    if (!title || !content || !author_id) {
      return res.status(400).json({ error: "Titre, contenu et auteur sont requis" });
    }

    const newArticle = await createArticle(title, content, author_id);
    res.status(201).json(newArticle);
  } catch (error) {
    console.error("Erreur ajout article:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}


export async function fetchArticles(req, res) {
  try {
    const articles = await getAllArticles();
    res.json(articles);
  } catch (error) {
    console.error("Erreur récupération articles:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}


export async function fetchArticleById(req, res) {
  try {
    const article = await getArticleById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: "Article non trouvé" });
    }
    res.json(article);
  } catch (error) {
    console.error("Erreur récupération article:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}


export async function editArticle(req, res) {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Titre et contenu sont requis" });
    }

    const success = await updateArticle(req.params.id, title, content);
    if (!success) {
      return res.status(404).json({ error: "Article non trouvé" });
    }

 
    const updatedArticle = await getArticleById(req.params.id);
    res.json(updatedArticle);
  } catch (error) {
    console.error("Erreur mise à jour article:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}


export async function removeArticle(req, res) {
  try {
    const success = await deleteArticle(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Article non trouvé" });
    }
    res.json({ message: "Article supprimé avec succès" });
  } catch (error) {
    console.error("Erreur suppression article:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

