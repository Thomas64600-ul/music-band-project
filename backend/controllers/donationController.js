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
} from "../models/Donation.js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export async function addDonation(req, res, next) {
  try {
    const { user_id, amount, message } = req.validatedBody;
    const newDonation = await createDonation(user_id, amount, message);
    res.status(201).json(newDonation);
  } catch (error) {
    next(error);
  }
}
export async function editDonation(req, res, next) {
  try {
    const { id } = req.params;
    const updated = await updateDonationById(id, req.validatedBody);

    if (!updated) {
      return res.status(404).json({ error: "Don non trouvé" });
    }

    const updatedDonation = await getDonationById(id);
    res.json({
      message: "Don mis à jour avec succès",
      donation: updatedDonation,
    });
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
    if (!donation) return res.status(404).json({ error: "Don non trouvé" });
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
    if (!success) return res.status(404).json({ error: "Don non trouvé" });
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



export async function createCheckoutSession(req, res, next) {
  try {
    const { user_id, amount, message } = req.body;

  
    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: "Montant invalide" });
    }

   
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Don à REVEREN",
              description: message || "Soutien au groupe",
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
      user_id || null,
      amount,
      message,
      session.id,
      null,
      "eur"
    );

   
    res.status(200).json({ url: session.url });
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
      console.log(`✅ Paiement confirmé pour session ${session.id}`);
    }

    if (event.type === "payment_intent.payment_failed") {
      const session = event.data.object;
      await updateDonationStatus(session.id, "failed");
      console.log(`❌ Paiement échoué pour session ${session.id}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error("Erreur dans le webhook Stripe:", error);
    next(error);
  }
}

