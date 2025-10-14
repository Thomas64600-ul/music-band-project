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
  resetPassword,
  me
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
import upload from "../middlewares/uploadMiddleware.js";
import { 
  loginLimiter, 
  registerLimiter, 
  resetPasswordLimiter 
} from "../middlewares/rateLimiter.js";

const router = express.Router();


router.post("/register", registerLimiter, validate(registerSchema), register);
router.post("/login", loginLimiter, validate(loginSchema), login);
router.post("/forgot-password", resetPasswordLimiter, validate(forgotPasswordSchema), forgotPassword);
router.post("/reset-password/:token", validate(resetPasswordSchema), resetPassword);


router.post("/logout", protect, logout);
router.get("/me", protect, me);
router.get("/", protect, authorizeRoles("admin"), fetchUsers);
router.get("/:id", protect, fetchUserById);
router.put("/:id", protect, upload.single("image"), validate(updateUserSchema), editUser);
router.delete("/:id", protect, authorizeRoles("admin"), removeUser);

export default router;


