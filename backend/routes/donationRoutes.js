import express from "express";
import {
  addDonation,
  editDonation,
  fetchDonations,
  fetchDonationById,
  fetchDonationsByUser,
  removeDonation,
  fetchDonationStats,
  createCheckoutSession,
  handleStripeWebhook,
} from "../controllers/donationController.js";

import { validate } from "../middlewares/validationMiddleware.js";
import {
  createDonationSchema,
  updateDonationSchema,
  stripeDonationSchema,
} from "../schemas/donationSchema.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/webhook", handleStripeWebhook);

router.post("/", validate(createDonationSchema), addDonation);

router.post("/create-checkout-session", validate(stripeDonationSchema), createCheckoutSession);

router.get("/user", protect, fetchDonationsByUser);

router.get("/", protect, authorizeRoles("admin"), fetchDonations);

router.get("/stats", protect, authorizeRoles("admin"), fetchDonationStats);

router.get("/:id", protect, authorizeRoles("admin"), fetchDonationById);

router.put("/:id", protect, authorizeRoles("admin"), validate(updateDonationSchema), editDonation);

router.delete("/:id", protect, authorizeRoles("admin"), removeDonation);

export default router;



