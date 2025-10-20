
import express from "express";
import {
  addMusic,
  fetchMusics,
  fetchMusicById,
  editMusic,
  removeMusic,
} from "../controllers/musicController.js";

import { validate } from "../middlewares/validationMiddleware.js";
import { createMusicSchema, updateMusicSchema } from "../schemas/musicSchema.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  upload.single("cover"),
  validate(createMusicSchema),
  addMusic
);

router.get("/", fetchMusics);
router.get("/:id", fetchMusicById);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  upload.single("cover"),
  validate(updateMusicSchema),
  editMusic
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  removeMusic
);

export default router;
