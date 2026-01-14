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
  updateDonationById,
} from "../models/Donation.js";

import { sendEmail } from "../services/emailService.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function findDonationBySessionId(sessionId) {
  const { rows } = await pool.query(
    "SELECT * FROM donations WHERE stripe_session_id = $1 LIMIT 1",
    [sessionId]
  );
  return rows[0] || null;
}

export async function addDonation(req, res, next) {
  try {
    const { user_id, amount, message } = req.validatedBody;

    const newDonation = await createDonation(user_id, amount, message, null, null, "eur", null, "succeeded");

    await sendEmail(
      process.env.ADMIN_EMAIL,
      "Nouveau don ajouté (manuel)",
      "Un don a été ajouté manuellement depuis le panneau d’administration.",
      "adminDonationAlert.html",
      {
        amount,
        donor: user_id ? `Utilisateur #${user_id}` : "Ajout manuel",
        message: message || "—",
        date: new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" }),
        status: "Ajouté manuellement",
      }
    );

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
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Non authentifié" });

    const donations = await getDonationsByUserId(userId);
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

export async function fetchDonationPublicStats(req, res, next) {
  try {
    const stats = await getDonationStats();
    res.json({
      total_dons: stats.total_dons,
      total_montant: stats.total_montant,
    });
  } catch (error) {
    next(error);
  }
}

export async function createCheckoutSession(req, res, next) {
  try {
    const { user_id, amount, message, email } = req.validatedBody;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: "Montant invalide." });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Don à REVEREN",
              description: message || "Soutien au groupe",
            },
            unit_amount: Math.round(Number(amount) * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",

      success_url: `${process.env.CLIENT_URL}/donation-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/donation-cancel`,

      metadata: {
        user_id: user_id || "anonyme",
        message: message || "",
      },
    });

    await createDonation(
      user_id || null,
      amount,
      message,
      session.id,
      null,
      "eur",
      email || null,
      "pending"
    );

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Erreur Stripe Checkout:", error.message);
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
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

        await updateDonationStatus(
          session.id,
          "succeeded",
          session.payment_intent
        );
        console.log(`Paiement confirmé pour session ${session.id}`);

        const donation = await findDonationBySessionId(session.id);

        if (donation) {
          const donorEmail = donation.email || session.customer_details?.email;
          const donorName =
            session.customer_details?.name?.split(" ")[0] ||
            "Cher·e donateur·rice";

          await sendEmail(
            process.env.ADMIN_EMAIL,
            "Nouveau don reçu sur REVEREN",
            `Un don de ${donation.amount} € a été confirmé.`,
            "adminDonationAlert.html",
            {
              amount: donation.amount,
              message: donation.message || "—",
              status: "Validé",
              donor:
                donation.email ||
                (donation.user_id
                  ? `Utilisateur #${donation.user_id}`
                  : "Anonyme"),
              date: new Date().toLocaleString("fr-FR", {
                timeZone: "Europe/Paris",
              }),
            }
          );

          if (donorEmail) {
            await sendEmail(
              donorEmail,
              "Merci pour votre don à REVEREN 🎶",
              `Merci pour votre don de ${donation.amount} € !`,
              "donorThankYou.html",
              {
                firstname: donorName,
                amount: donation.amount,
                siteUrl: process.env.CLIENT_URL,
              }
            );
          }
        }

        break;
      }

      case "payment_intent.payment_failed": {
        const intent = event.data.object;
        const reason =
          intent.last_payment_error?.message || "Paiement échoué ou annulé.";

        const sessions = await stripe.checkout.sessions.list({
          payment_intent: intent.id,
          limit: 1,
        });

        const session = sessions.data?.[0];

        if (session) {
          await updateDonationStatus(session.id, "failed", intent.id);

          const donation = await findDonationBySessionId(session.id);

          if (donation) {
            await sendEmail(
              process.env.ADMIN_EMAIL,
              "Échec d’un paiement sur REVEREN",
              `Un don de ${donation.amount} € a échoué.`,
              "adminDonationFailed.html",
              {
                amount: donation.amount,
                donor:
                  donation.email ||
                  (donation.user_id
                    ? `Utilisateur #${donation.user_id}`
                    : "Anonyme"),
                message: donation.message || "—",
                date: new Date().toLocaleString("fr-FR", {
                  timeZone: "Europe/Paris",
                }),
                reason,
              }
            );
          }
        } else {
          console.warn(
            "payment_intent.payment_failed reçu mais aucune session trouvée pour intent:",
            intent.id
          );
        }

        break;
      }

      default:
        console.log(`ℹ️ Événement Stripe non géré : ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error("Erreur dans le webhook Stripe:", error);
    next(error);
  }
}




