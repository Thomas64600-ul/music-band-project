import {
  createDonation,
  getAllDonations,
  getDonationById,
  getDonationsByUserId,
  deleteDonation,
  getDonationStats
} from "../models/Donation.js";


export async function addDonation(req, res) {
  try {
    const { user_id, amount, message } = req.body;
    if (!amount) {
      return res.status(400).json({ error: "Montant requis" });
    }

    const newDonation = await createDonation(user_id, amount, message);
    res.status(201).json(newDonation);
  } catch (error) {
    console.error("Erreur ajout don:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}


export async function fetchDonations(req, res) {
  try {
    const donations = await getAllDonations();
    res.json(donations);
  } catch (error) {
    console.error("Erreur récupération dons:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}


export async function fetchDonationById(req, res) {
  try {
    const donation = await getDonationById(req.params.id);
    if (!donation) {
      return res.status(404).json({ error: "Don non trouvé" });
    }
    res.json(donation);
  } catch (error) {
    console.error("Erreur récupération don:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}


export async function fetchDonationsByUser(req, res) {
  try {
    const donations = await getDonationsByUserId(req.params.user_id);
    res.json(donations);
  } catch (error) {
    console.error("Erreur récupération dons utilisateur:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}


export async function removeDonation(req, res) {
  try {
    const success = await deleteDonation(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Don non trouvé" });
    }
    res.json({ message: "Don supprimé avec succès" });
  } catch (error) {
    console.error("Erreur suppression don:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}


export async function fetchDonationStats(req, res) {
  try {
    const stats = await getDonationStats();
    res.json(stats);
  } catch (error) {
    console.error("Erreur récupération stats dons:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}
