import pool from "../config/db.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

import {
  createDonation,
  getAllDonations,
  getDonationById,
  getDonationsByUserId,
  deleteDonation,
  getDonationStats,
  updateDonationStatus,
  updateDonationById
} from "../models/Donation.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export async function addDonation(req, res, next) {
  try {
    const { amount, message, email } = req.validatedBody;
    const user_id = req.user ? req.user.id : null;

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: "Montant invalide." });
    }

    const newDonation = await createDonation(user_id, amount, message, null, null, "eur", email || null);

    res.status(201).json({
      success: true,
      message: "Don ajouté avec succès.",
      data: newDonation,
    });
  } catch (error) {
    next(error);
  }
}


export async function editDonation(req, res, next) {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Accès refusé : réservé aux administrateurs." });
    }

    const { id } = req.params;
    const updated = await updateDonationById(id, req.validatedBody);

    if (!updated) {
      return res.status(404).json({ error: "Don non trouvé." });
    }

    const updatedDonation = await getDonationById(id);
    res.json({
      success: true,
      message: "Don mis à jour avec succès.",
      data: updatedDonation,
    });
  } catch (error) {
    next(error);
  }
}


export async function fetchDonations(req, res, next) {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Accès refusé : réservé aux administrateurs." });
    }

    const donations = await getAllDonations();
    res.json({
      success: true,
      count: donations.length,
      data: donations,
    });
  } catch (error) {
    next(error);
  }
}


export async function fetchDonationById(req, res, next) {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Accès refusé : réservé aux administrateurs." });
    }

    const donation = await getDonationById(req.params.id);
    if (!donation) return res.status(404).json({ error: "Don non trouvé." });

    res.json({ success: true, data: donation });
  } catch (error) {
    next(error);
  }
}


export async function fetchDonationsByUser(req, res, next) {
  try {
    const userId = req.user.id;
    const donations = await getDonationsByUserId(userId);

    res.json({
      success: true,
      count: donations.length,
      data: donations,
    });
  } catch (error) {
    next(error);
  }
}


export async function removeDonation(req, res, next) {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Accès refusé : réservé aux administrateurs." });
    }

    const success = await deleteDonation(req.params.id);
    if (!success) return res.status(404).json({ error: "Don non trouvé." });

    res.json({ success: true, message: "Don supprimé avec succès." });
  } catch (error) {
    next(error);
  }
}


export async function fetchDonationStats(req, res, next) {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Accès refusé : réservé aux administrateurs." });
    }

    const stats = await getDonationStats();
    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
}


export async function createCheckoutSession(req, res, next) {
  try {
    const { amount, message, email } = req.body;
    const user_id = req.user ? req.user.id : null;

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: "Montant invalide." });
    }

    
    const safeMessage = message?.substring(0, 200).replace(/[^a-zA-Z0-9 .,!?'"-]/g, "");

  
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Don à REVEREN",
              description: safeMessage || "Soutien au groupe REVEREN",
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/donation-success`,
      cancel_url: `${process.env.CLIENT_URL}/donation-cancel`,
    });

   
    await createDonation(
      user_id,
      amount,
      safeMessage,
      session.id,
      null,
      "eur",
      email || null
    );

    res.status(200).json({
      success: true,
      message: "Session Stripe créée avec succès.",
      url: session.url,
    });
  } catch (error) {
    console.error("Erreur Stripe :", error);
    next(error);
  }
}


export async function handleStripeWebhook(req, res, next) {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, 
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Erreur de signature Webhook :", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      await updateDonationStatus(session.id, "succeeded", session.payment_intent);
      console.log(`Paiement confirmé pour session ${session.id}`);
    }

    if (event.type === "payment_intent.payment_failed") {
      const session = event.data.object;
      await updateDonationStatus(session.id, "failed");
      console.log(`Paiement échoué pour session ${session.id}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error("Erreur dans le webhook Stripe:", error);
    next(error);
  }
}

