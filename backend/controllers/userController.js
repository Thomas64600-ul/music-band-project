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


export async function register(req, res) {
  try {
    const { firstname, lastname, email, password, role } = req.body;
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ error: "Tous les champs sont obligatoires" });
    }

    
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: "Cet email est déjà utilisé" });
    }

    
    const hashed = await hashPassword(password);

    const newUser = await createUser(firstname, lastname, email, hashed, role);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Erreur register:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}


export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email et mot de passe requis" });
    }

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

    res.json({ message: "Connexion réussie", token });
  } catch (error) {
    console.error("Erreur login:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}


export async function fetchUsers(req, res) {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Erreur fetchUsers:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}


export async function fetchUserById(req, res) {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });
    res.json(user);
  } catch (error) {
    console.error("Erreur fetchUserById:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}


export async function editUser(req, res) {
  try {
    const { firstname, lastname, email, role } = req.body;
    const updated = await updateUser(req.params.id, firstname, lastname, email, role);

    if (!updated) return res.status(404).json({ error: "Utilisateur non trouvé" });
    res.json({ success: true, message: "Utilisateur mis à jour" });
  } catch (error) {
    console.error("Erreur editUser:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}


export async function removeUser(req, res) {
  try {
    const deleted = await deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Utilisateur non trouvé" });
    res.json({ success: true, message: "Utilisateur supprimé" });
  } catch (error) {
    console.error("Erreur removeUser:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}
