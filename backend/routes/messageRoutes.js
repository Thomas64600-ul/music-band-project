import express from "express";
import {
  addMessage,
  fetchMessages,
  fetchUnreadMessages,
  fetchMessageById,
  fetchMessagesByEmail,
  readMessage,
  removeMessage
} from "../controllers/messageController.js";

import { validate } from "../middlewares/validationMiddleware.js";
import { createMessageSchema } from "../schemas/messageSchema.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { contactLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();


router.post("/", contactLimiter, validate(createMessageSchema), addMessage);


router.get("/", protect, authorizeRoles("admin"), fetchMessages);


router.get("/unread", protect, authorizeRoles("admin"), fetchUnreadMessages);


router.get("/search", protect, authorizeRoles("admin"), fetchMessagesByEmail);


router.get("/:id", protect, authorizeRoles("admin"), fetchMessageById);


router.put("/:id/read", protect, authorizeRoles("admin"), readMessage);


router.delete("/:id", protect, authorizeRoles("admin"), removeMessage);

export default router;

