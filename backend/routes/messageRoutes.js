import express from "express";
import {
  addMessage,
  fetchMessages,
  fetchMessageById,
  fetchMessagesByEmail,
  readMessage,
  removeMessage
} from "../controllers/messageController.js";
import { validate } from "../middlewares/validationMiddleware.js";
import { createMessageSchema, updateMessageSchema } from "../schemas/messageSchema.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();


router.post("/", validate(createMessageSchema), addMessage);


router.get("/", protect, authorizeRoles("admin"), fetchMessages);


router.get("/:id", protect, authorizeRoles("admin"), fetchMessageById);


router.get("/email/:email", protect, authorizeRoles("admin"), fetchMessagesByEmail);


router.patch("/:id/read", protect, authorizeRoles("admin"), readMessage);


router.delete("/:id", protect, authorizeRoles("admin"), removeMessage);

export default router;
