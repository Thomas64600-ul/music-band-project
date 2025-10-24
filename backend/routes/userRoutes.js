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
  me,
  verifyEmail,
} from "../controllers/userController.js";

import { validate } from "../middlewares/validationMiddleware.js";
import {
  registerSchema,
  loginSchema,
  updateUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../schemas/userSchema.js";

import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import {
  loginLimiter,
  registerLimiter,
  resetPasswordLimiter,
} from "../middlewares/rateLimiter.js";

const router = express.Router();


router.post("/register", registerLimiter, validate(registerSchema), register);
router.get("/verify/:token", verifyEmail);
router.post("/login", loginLimiter, validate(loginSchema), login);
router.post("/logout", protect, logout);


router.post(
  "/forgot-password",
  resetPasswordLimiter,
  validate(forgotPasswordSchema),
  forgotPassword
);
router.post("/reset-password/:token", validate(resetPasswordSchema), resetPassword);


router.get("/me", protect, me);


router.get("/", protect, authorizeRoles("admin"), fetchUsers);
router.get("/:id", protect, fetchUserById);
router.put("/:id", protect, upload.single("image"), validate(updateUserSchema), editUser);
router.delete("/:id", protect, authorizeRoles("admin"), removeUser);


router.get("/debug/auth", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Token valide et cookie reçu",
    user: req.user,
    cookies: req.cookies,
    headers: {
      origin: req.get("origin"),
      referer: req.get("referer"),
    },
  });
});

export default router;





