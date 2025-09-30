import {
  createDonation,
  getAllDonations,
  getDonationById,
  getDonationsByUserId,
  deleteDonation,
  getDonationStats
} from "../models/Donation.js";


export async function addDonation(req, res, next) {
  try {
    const { user_id, amount, message } = req.validatedBody; 

    const newDonation = await createDonation(user_id, amount, message);
    res.status(201).json(newDonation);
  } catch (error) {
    next(error);
  }
}


export async function fetchDonations(req, res, next) {
  try {
    const donations = await getAllDonations();
    res.json(donations);
  } catch (error) {
    next(error);
  }
}


export async function fetchDonationById(req, res, next) {
  try {
    const donation = await getDonationById(req.params.id);
    if (!donation) {
      return res.status(404).json({ error: "Don non trouvé" });
    }
    res.json(donation);
  } catch (error) {
    next(error);
  }
}


export async function fetchDonationsByUser(req, res, next) {
  try {
    const donations = await getDonationsByUserId(req.params.user_id);
    res.json(donations);
  } catch (error) {
    next(error);
  }
}


export async function removeDonation(req, res, next) {
  try {
    const success = await deleteDonation(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Don non trouvé" });
    }
    res.json({ message: "Don supprimé avec succès" });
  } catch (error) {
    next(error);
  }
}


export async function fetchDonationStats(req, res, next) {
  try {
    const stats = await getDonationStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
}
