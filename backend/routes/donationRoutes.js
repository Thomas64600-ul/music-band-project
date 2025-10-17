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
  handleStripeWebhook
} from "../controllers/donationController.js";

import { validate } from "../middlewares/validationMiddleware.js";
import { createDonationSchema, updateDonationSchema } from "../schemas/donationSchema.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import bodyParser from "body-parser";

const router = express.Router();




router.post("/", validate(createDonationSchema), addDonation);


router.post("/create-checkout-session", validate(createDonationSchema), createCheckoutSession);


router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  handleStripeWebhook
);




router.get("/user", protect, fetchDonationsByUser);




router.get("/", protect, authorizeRoles("admin"), fetchDonations);


router.get("/stats", protect, authorizeRoles("admin"), fetchDonationStats);


router.get("/:id", protect, authorizeRoles("admin"), fetchDonationById);


router.put("/:id", protect, authorizeRoles("admin"), validate(updateDonationSchema), editDonation);


router.delete("/:id", protect, authorizeRoles("admin"), removeDonation);

export default router;

