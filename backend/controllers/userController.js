import {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser
} from "../models/User.js";

import { hashPassword, comparePassword } from "../middlewares/hashPassword.js";
import jwt from "jsonwebtoken";


export async function register(req, res, next) {
  try {
    const { firstname, lastname, email, password, role } = req.validatedBody; 

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: "Cet email est déjà utilisé" });
    }

    const hashed = await hashPassword(password);
    const newUser = await createUser(firstname, lastname, email, hashed, role);

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
}


export async function login(req, res, next) {
  try {
    const { email, password } = req.validatedBody;

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Mot de passe incorrect" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict",
      maxAge: 60 * 60 * 1000 
    });

    res.json({ message: "Connexion réussie" });
  } catch (error) {
    next(error);
  }
}


export async function fetchUsers(req, res, next) {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
}


export async function fetchUserById(req, res, next) {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });
    res.json(user);
  } catch (error) {
    next(error);
  }
}


export async function editUser(req, res, next) {
  try {
    const { firstname, lastname, email, role } = req.validatedBody;

    const updated = await updateUser(req.params.id, firstname, lastname, email, role);
    if (!updated) return res.status(404).json({ error: "Utilisateur non trouvé" });

    res.json({ success: true, message: "Utilisateur mis à jour" });
  } catch (error) {
    next(error);
  }
}


export async function removeUser(req, res, next) {
  try {
    const deleted = await deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Utilisateur non trouvé" });

    res.json({ success: true, message: "Utilisateur supprimé" });
  } catch (error) {
    next(error);
  }
}


export async function logout(req, res, next) {
  try {
    res.clearCookie("token"); 
    res.json({ message: "Déconnexion réussie" });
  } catch (error) {
    next(error);
  }
}

