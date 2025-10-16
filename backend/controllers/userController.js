import {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  updateUserPassword,
  saveResetToken,
  getUserByResetToken,
} from "../models/User.js";

import { sendEmail } from "../services/emailService.js";
import { hashPassword, comparePassword } from "../middlewares/hashPassword.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();


function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
}


export async function register(req, res, next) {
  try {
    const { firstname, lastname, email, password, role } = req.validatedBody;
    const imageUrl = req.file?.path || null;

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: "Cet email est déjà utilisé." });
    }

    const hashed = await hashPassword(password);
    const newUser = await createUser(firstname, lastname, email, hashed, role, imageUrl);

    const token = generateToken(newUser);

   
    const isProd = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 60 * 60 * 1000, // 1h
    });

    
    await sendEmail(
      email,
      "Bienvenue sur Music Band",
      `Bienvenue ${firstname}, votre compte a bien été créé.`,
      "userRegister.html",
      {
        firstname,
        email,
        loginUrl: `${process.env.CLIENT_URL}/login`,
      }
    );

    return res.status(201).json({
      success: true,
      message: "Utilisateur créé avec succès",
      token,
      user: {
        id: newUser.id,
        firstname,
        lastname,
        email,
        role: newUser.role,
        image_url: newUser.image_url,
      },
    });
  } catch (error) {
    next(error);
  }
}


export async function login(req, res, next) {
  try {
    const { email, password } = req.validatedBody;

    const user = await getUserByEmail(email);
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé." });

    const validPassword = await comparePassword(password, user.hashed_password);
    if (!validPassword) {
      return res.status(401).json({ error: "Mot de passe incorrect." });
    }

    const token = generateToken(user);

 
    const isProd = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "Connexion réussie.",
      token,
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        image_url: user.image_url,
      },
    });
  } catch (error) {
    next(error);
  }
}


export async function logout(req, res, next) {
  try {
    const isProd = process.env.NODE_ENV === "production";
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
    });

    res.json({ success: true, message: "Déconnexion réussie." });
  } catch (error) {
    next(error);
  }
}


export async function me(req, res, next) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Non authentifié." });
    }

    const user = await getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable." });
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        image_url: user.image_url,
      },
    });
  } catch (error) {
    next(error);
  }
}


export async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    const user = await getUserByEmail(email);

    if (!user) {
      return res.json({
        message: "Si un compte correspond à cet email, un message a été envoyé.",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 60 * 60 * 1000);

    await saveResetToken(user.id, resetToken, expiry);
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendEmail(
      email,
      "Réinitialisation du mot de passe",
      `Cliquez sur ce lien pour réinitialiser votre mot de passe : ${resetUrl}`,
      "resetPassword.html",
      { firstname: user.firstname, resetUrl }
    );

    res.json({
      success: true,
      message: "Email de réinitialisation envoyé (si le compte existe).",
    });
  } catch (error) {
    next(error);
  }
}


export async function fetchUsers(req, res, next) {
  try {
    const users = await getAllUsers();
    res.json({ success: true, users });
  } catch (error) {
    next(error);
  }
}

export async function fetchUserById(req, res, next) {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé." });
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
}

export async function editUser(req, res, next) {
  try {
    const { firstname, lastname, email, role } = req.validatedBody;
    const imageUrl = req.file?.path || null;

    const updated = await updateUser(req.params.id, firstname, lastname, email, role, imageUrl);
    if (!updated) return res.status(404).json({ error: "Utilisateur non trouvé." });

    res.json({ success: true, message: "Utilisateur mis à jour." });
  } catch (error) {
    next(error);
  }
}

export async function removeUser(req, res, next) {
  try {
    const deleted = await deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Utilisateur non trouvé." });
    res.json({ success: true, message: "Utilisateur supprimé." });
  } catch (error) {
    next(error);
  }
}

export async function resetPassword(req, res, next) {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await getUserByResetToken(token);
    if (!user) {
      return res.status(400).json({ error: "Token invalide ou expiré." });
    }

    const hashed = await hashPassword(password);
    await updateUserPassword(user.id, hashed);

    res.json({
      success: true,
      message: "Mot de passe réinitialisé avec succès.",
    });
  } catch (error) {
    next(error);
  }
}


