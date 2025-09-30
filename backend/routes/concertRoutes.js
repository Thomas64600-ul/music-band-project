import express from "express";
import {
  addConcert,
  fetchConcerts,
  fetchConcertById,
  editConcert,
  removeConcert,
  fetchUpcomingConcerts,
  fetchConcertsByLocation
} from "../controllers/concertController.js";
import { validate } from "../middlewares/validationMiddleware.js";
import { createConcertSchema, updateConcertSchema } from "../schemas/concertSchema.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("admin"), validate(createConcertSchema), addConcert);
router.get("/", fetchConcerts);
router.get("/upcoming", fetchUpcomingConcerts);
router.get("/location/:location", fetchConcertsByLocation);
router.get("/:id", fetchConcertById);
router.put("/:id", protect, authorizeRoles("admin"), validate(updateConcertSchema), editConcert);
router.delete("/:id", protect, authorizeRoles("admin"), removeConcert);

export default router;
