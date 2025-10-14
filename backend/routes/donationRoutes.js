import express from "express";
import {
  addDonation,
  editDonation, // ✅ ajoutée
  fetchDonations,
  fetchDonationById,
  fetchDonationsByUser,
  removeDonation,
  fetchDonationStats,
  createCheckoutSession,
  handleStripeWebhook
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


router.put("/:id", protect, validate(updateDonationSchema), editDonation);
router.delete("/:id", protect, removeDonation);


router.post("/create-checkout-session", createCheckoutSession);


router.post("/webhook", handleStripeWebhook);

export default router;
