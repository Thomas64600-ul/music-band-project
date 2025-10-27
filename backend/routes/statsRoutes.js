import express from "express";
import { getGlobalStatsController } from "../controllers/statsController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, authorizeRoles("admin"), getGlobalStatsController);

export default router;
