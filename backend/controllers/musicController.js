import {
  createMusic,
  getAllMusics,
  getMusicById,
  updateMusic,
  deleteMusic,
} from "../models/Music.js";
import { sendEmail } from "../services/emailService.js";

export async function addMusic(req, res, next) {
  try {
    const { title, artist } = req.body;
    const author_id = req.user?.id;

    const audioFile = req.files?.audio?.[0] || req.file; 
    const coverFile = req.files?.cover?.[0];

    const audio_url = audioFile?.path || req.body.url; 
    const cover_url = coverFile?.path || null;

    if (!title || !audio_url) {
      return res.status(400).json({
        success: false,
        error: "Le titre et le fichier audio sont requis.",
      });
    }

    const newMusic = await createMusic(
      title,
      artist,
      audio_url,
      cover_url,
      author_id
    );

    await sendEmail(
      process.env.ADMIN_EMAIL,
      "Nouveau morceau ajouté",
      `Un nouveau morceau vient d’être ajouté par ${
        req.user.firstname || "un utilisateur"
      }.`,
      "adminNewMusic.html",
      {
        title,
        artist: artist || "—",
        author: `${req.user.firstname || ""} ${req.user.lastname || ""}`,
        date: new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" }),
        url: audio_url,
        cover_url,
      }
    );

    res.status(201).json({
      success: true,
      message: "Musique ajoutée avec succès 🎶",
      data: newMusic,
    });
  } catch (error) {
    console.error("Erreur ajout musique :", error);
    next(error);
  }
}


export async function fetchMusics(req, res, next) {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const offset = (page - 1) * limit;

    const musics = await getAllMusics(limit, offset);

    res.status(200).json({
      success: true,
      page,
      limit,
      count: musics.length,
      data: musics,
    });
  } catch (error) {
    next(error);
  }
}

export async function fetchMusicById(req, res, next) {
  try {
    const music = await getMusicById(req.params.id);

    if (!music) {
      return res.status(404).json({
        success: false,
        error: "Musique non trouvée.",
      });
    }

    res.status(200).json({
      success: true,
      data: music,
    });
  } catch (error) {
    next(error);
  }
}

export async function editMusic(req, res, next) {
  try {
    const { title, artist, url } = req.validatedBody;
    const user = req.user;

    const audioFile = req.files?.audio?.[0];
    const coverFile = req.files?.cover?.[0];
    const audio_url = audioFile?.path || url;
    const cover_url = coverFile?.path || null;

    const music = await getMusicById(req.params.id);
    if (!music) {
      return res.status(404).json({
        success: false,
        error: "Musique non trouvée.",
      });
    }

    if (user.role !== "admin" && music.author_id !== user.id) {
      return res.status(403).json({
        success: false,
        error: "Non autorisé à modifier cette musique.",
      });
    }

    const updated = await updateMusic(req.params.id, title, artist, audio_url, cover_url);
    if (!updated) {
      return res.status(404).json({
        success: false,
        error: "Échec de la mise à jour de la musique.",
      });
    }

    const updatedMusic = await getMusicById(req.params.id);

    await sendEmail(
      process.env.ADMIN_EMAIL,
      "Musique mise à jour",
      `Une musique a été modifiée par ${req.user.firstname || "un administrateur"}.`,
      "adminMusicUpdated.html",
      {
        title: title || updatedMusic.title,
        artist: artist || updatedMusic.artist,
        author: `${req.user.firstname || ""} ${req.user.lastname || ""}`,
        date: new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" }),
        url: audio_url || updatedMusic.url,
        cover_url: cover_url || updatedMusic.cover_url,
      }
    );

    res.status(200).json({
      success: true,
      message: "Musique mise à jour avec succès.",
      data: updatedMusic,
    });
  } catch (error) {
    next(error);
  }
}

export async function removeMusic(req, res, next) {
  try {
    const user = req.user;
    const music = await getMusicById(req.params.id);

    if (!music) {
      return res.status(404).json({
        success: false,
        error: "Musique non trouvée.",
      });
    }

    if (user.role !== "admin" && music.author_id !== user.id) {
      return res.status(403).json({
        success: false,
        error: "Non autorisé à supprimer cette musique.",
      });
    }

    const success = await deleteMusic(req.params.id);
    if (!success) {
      return res.status(404).json({
        success: false,
        error: "Échec de la suppression de la musique.",
      });
    }

    await sendEmail(
      process.env.ADMIN_EMAIL,
      "Musique supprimée",
      `Un morceau vient d’être supprimé.`,
      "adminMusicDeleted.html",
      {
        title: music.title,
        author: `${req.user.firstname || ""} ${req.user.lastname || ""}`,
        date: new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" }),
      }
    );

    res.status(200).json({
      success: true,
      message: "Musique supprimée avec succès.",
    });
  } catch (error) {
    next(error);
  }
}

