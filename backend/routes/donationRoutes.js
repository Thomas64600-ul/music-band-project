import express from "express";
import {
  addDonation,
  fetchDonations,
  fetchDonationById,
  fetchDonationsByUser,
  removeDonation,
  fetchDonationStats
} from "../controllers/donationController.js";
import { validate } from "../middlewares/validationMiddleware.js";
import { createDonationSchema, updateDonationSchema } from "../schemas/donationSchema.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", validate(createDonationSchema), addDonation);
router.get("/", fetchDonations);
router.get("/stats", fetchDonationStats);
router.get("/user/:user_id", fetchDonationsByUser);
router.get("/:id", fetchDonationById);
router.put("/:id", protect, validate(updateDonationSchema), addDonation);
router.delete("/:id", protect, removeDonation);

export default router;
