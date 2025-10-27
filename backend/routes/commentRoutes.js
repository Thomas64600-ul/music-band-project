import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import {
  createComment,
  fetchComments,
  fetchAllComments, 
  editComment, 
  removeComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.get("/", protect, authorizeRoles("admin"), fetchAllComments);

router.post("/", protect, createComment);

router.get("/:targetType/:targetId", fetchComments);

router.put("/:id", protect, editComment);

router.delete("/:id", protect, removeComment);

export default router;


