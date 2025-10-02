import express from "express";
import {
  register,
  login,
  fetchUsers,
  fetchUserById,
  editUser,
  removeUser,
  logout,
  forgotPassword,
  resetPassword
} from "../controllers/userController.js";

import { validate } from "../middlewares/validationMiddleware.js";
import { 
  registerSchema, 
  loginSchema, 
  updateUserSchema, 
  forgotPasswordSchema, 
  resetPasswordSchema 
} from "../schemas/userSchema.js";

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


router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);
router.post("/reset-password/:token", validate(resetPasswordSchema), resetPassword);

export default router;
