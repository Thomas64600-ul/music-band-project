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
  saveEmailToken,
  getUserByEmailToken,
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

    const existing = await getUserByEmail(email);
    if (existing) {
      return res.status(409).json({ success: false, error: "Cet email est déjà utilisé." });
    }

    const hashed = await hashPassword(password);
    const newUser = await createUser(firstname, lastname, email, hashed, role, imageUrl);

    const emailToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    await saveEmailToken(newUser.id, emailToken, expiresAt);

    const verifyUrl = `${process.env.CLIENT_URL}/verify-email/${emailToken}`;

    await sendEmail(
      email,
      "Vérifie ton adresse e-mail",
      `Bienvenue ${firstname}, clique sur ce lien pour activer ton compte : ${verifyUrl}`,
      "verifyEmail.html",
      { firstname, verifyUrl }
    );

    await sendEmail(
      process.env.ADMIN_EMAIL,
      "Nouvel utilisateur inscrit sur Music Band",
      `Nouvel utilisateur : ${firstname} ${lastname} (${email})`,
      "adminNewUserAlert.html",
      {
        firstname,
        lastname,
        email,
        date: new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" }),
      }
    );

    res.status(201).json({
      success: true,
      message: "Utilisateur créé. Vérifie ton e-mail pour activer ton compte.",
      data: {
        id: newUser.id,
        firstname,
        lastname,
        email,
        role: newUser.role,
        is_verified: newUser.is_verified,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function verifyEmail(req, res, next) {
  try {
    const { token } = req.params;

    const user = await getUserByEmailToken(token);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "Token invalide ou expiré." });
    }

    await updateUser(
      user.id,
      user.firstname,
      user.lastname,
      user.email,
      user.role,
      user.image_url,
      true
    );

    await sendEmail(
      user.email,
      "Ton compte est maintenant vérifié !",
      "Ton adresse e-mail a bien été confirmée.",
      "emailVerified.html",
      { firstname: user.firstname }
    );

    res
      .status(200)
      .json({ success: true, message: "Adresse e-mail vérifiée avec succès." });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.validatedBody;
    const user = await getUserByEmail(email);

    if (!user)
      return res.status(404).json({ success: false, error: "Utilisateur non trouvé." });

    if (!user.is_verified)
      return res.status(403).json({
        success: false,
        error: "Veuillez vérifier votre e-mail avant de vous connecter.",
      });

    const valid = await comparePassword(password, user.hashed_password);
    if (!valid)
      return res.status(401).json({ success: false, error: "Mot de passe incorrect." });

    const token = generateToken(user);

   res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  partitioned: true,   
  maxAge: 60 * 60 * 1000,
  path: "/",
});

    res.status(200).json({
  success: true,
  message: "Connexion réussie.",
  token, 
  data: {
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
    res.clearCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
});
    res.status(200).json({ success: true, message: "Déconnexion réussie." });
  } catch (error) {
    next(error);
  }
}

export async function me(req, res, next) {
  try {
    const user = await getUserById(req.user.id);
    if (!user)
      return res.status(404).json({ success: false, error: "Utilisateur introuvable." });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}

export async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    const user = await getUserByEmail(email);
    if (!user)
      return res.json({
        success: true,
        message: "Si un compte correspond à cet e-mail, un message a été envoyé.",
      });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 60 * 60 * 1000);
    await saveResetToken(user.id, resetToken, expiry);

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendEmail(
      email,
      "Réinitialisation du mot de passe",
      `Clique sur ce lien pour réinitialiser ton mot de passe : ${resetUrl}`,
      "resetPassword.html",
      { firstname: user.firstname, resetUrl }
    );

    res.status(200).json({
      success: true,
      message: "Email de réinitialisation envoyé (si le compte existe).",
    });
  } catch (error) {
    next(error);
  }
}

export async function resetPassword(req, res, next) {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await getUserByResetToken(token);
    if (!user)
      return res.status(400).json({ success: false, error: "Token invalide ou expiré." });

    const hashed = await hashPassword(password);
    await updateUserPassword(user.id, hashed);

    await sendEmail(
      user.email,
      "Mot de passe réinitialisé",
      "Votre mot de passe a été modifié avec succès.",
      "passwordResetSuccess.html",
      { firstname: user.firstname }
    );

    res.status(200).json({
      success: true,
      message: "Mot de passe réinitialisé avec succès.",
    });
  } catch (error) {
    next(error);
  }
}

export async function fetchUsers(req, res, next) {
  try {
    const users = await getAllUsers();
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
}

export async function fetchUserById(req, res, next) {
  try {
    const user = await getUserById(req.params.id);
    if (!user)
      return res.status(404).json({ success: false, error: "Utilisateur non trouvé." });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}

export async function editUser(req, res, next) {
  try {
    const { firstname, lastname, email, role } = req.validatedBody;
    const imageUrl = req.file?.path || null;

    const updated = await updateUser(req.params.id, firstname, lastname, email, role, imageUrl);
    if (!updated)
      return res.status(404).json({ success: false, error: "Utilisateur non trouvé." });

    res.status(200).json({
      success: true,
      message: "Utilisateur mis à jour avec succès.",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
}

export async function removeUser(req, res, next) {
  try {
    const success = await deleteUser(req.params.id);
    if (!success)
      return res.status(404).json({ success: false, error: "Utilisateur non trouvé." });

    res.status(200).json({ success: true, message: "Utilisateur supprimé avec succès." });
  } catch (error) {
    next(error);
  }
}









