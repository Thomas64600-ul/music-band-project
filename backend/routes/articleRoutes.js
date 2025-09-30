import express from "express";
import {
  addArticle,
  fetchArticles,
  fetchArticleById,
  editArticle,
  removeArticle
} from "../controllers/articleController.js";
import { validate } from "../middlewares/validationMiddleware.js";
import { createArticleSchema, updateArticleSchema } from "../schemas/articleSchema.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();


router.post("/", protect, authorizeRoles("admin"), validate(createArticleSchema), addArticle);


router.get("/", fetchArticles);


router.get("/:id", fetchArticleById);


router.put("/:id", protect, authorizeRoles("admin"), validate(updateArticleSchema), editArticle);


router.delete("/:id", protect, authorizeRoles("admin"), removeArticle);

export default router;
