import { getGlobalStats } from "../models/Stats.js";

export async function getGlobalStatsController(req, res, next) {
  try {
    const data = await getGlobalStats();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Erreur getGlobalStatsController :", error);
    next(error);
  }
}
