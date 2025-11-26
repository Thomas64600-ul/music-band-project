import express from "express";
import {
  addConcert,
  fetchConcerts,
  fetchConcertById,
  editConcert,
  removeConcert,
  fetchUpcomingConcerts,
  fetchPastConcerts,
  fetchConcertsByLocation
} from "../controllers/concertController.js";

import { validate } from "../middlewares/validationMiddleware.js";
import { createConcertSchema, updateConcertSchema } from "../schemas/concertSchema.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";


const router = express.Router();


router.get("/", fetchConcerts);


router.get("/search", fetchConcertsByLocation);


router.get("/upcoming", fetchUpcomingConcerts);


router.get("/past", fetchPastConcerts);


router.get("/:id", fetchConcertById);


router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  upload.single("image"),
  validate(createConcertSchema),
  addConcert
);


router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  upload.single("image"),
  validate(updateConcertSchema),
  editConcert
);


router.delete("/:id", protect, authorizeRoles("admin"), removeConcert);

export default router;



