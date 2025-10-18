import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createComment,
  fetchComments,
  removeComment
} from "../controllers/commentController.js";

const router = express.Router();


router.post("/", protect, createComment);


router.get("/:targetType/:targetId", fetchComments);


router.delete("/:id", protect, removeComment);

export default router;

