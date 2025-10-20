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

/* ======================
   🎵 CRÉER UNE MUSIQUE
====================== */
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  upload.single("cover"), // Nom du champ pour l’image de pochette
  validate(createMusicSchema),
  addMusic
);

/* ======================
   🎧 LISTER TOUTES LES MUSIQUES
====================== */
router.get("/", fetchMusics);

/* ======================
   🎵 OBTENIR UNE MUSIQUE PAR ID
====================== */
router.get("/:id", fetchMusicById);

/* ======================
   ✏️ MODIFIER UNE MUSIQUE
====================== */
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  upload.single("cover"), // mise à jour de la pochette
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
