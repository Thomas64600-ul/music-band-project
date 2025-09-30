import express from "express";
import {
  register,
  login,
  fetchUsers,
  fetchUserById,
  editUser,
  removeUser,
  logout
} from "../controllers/userController.js";
import { validate } from "../middlewares/validationMiddleware.js";
import { registerSchema, loginSchema, updateUserSchema } from "../schemas/userSchema.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();


router.post("/register", validate(registerSchema), register);


router.post("/login", validate(loginSchema), login);


router.post("/logout", protect, logout);


router.get("/", protect, authorizeRoles("admin"), fetchUsers);


router.get("/:id", protect, fetchUserById);


router.put("/:id", protect, validate(updateUserSchema), editUser);


router.delete("/:id", protect, authorizeRoles("admin"), removeUser);

export default router;
