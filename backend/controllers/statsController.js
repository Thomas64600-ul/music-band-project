import { getGlobalStats } from "../models/Stats.js";

export async function getGlobalStatsController(req, res, next) {
  try {
    const stats = await getGlobalStats();

    return res.status(200).json({
      success: true,
      message: "Statistiques globales récupérées avec succès.",
      data: stats,
    });
  } catch (error) {
    console.error("Erreur getGlobalStatsController :", error.message);

    return res.status(500).json({
      success: false,
      error: "Impossible de récupérer les statistiques globales.",
    });
  }
}
