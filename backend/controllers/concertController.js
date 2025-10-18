import {
  createConcert,
  getAllConcerts,
  getConcertById,
  updateConcert,
  deleteConcert,
  getUpcomingConcerts,
  getPastConcerts,
  getConcertsByLocation
} from "../models/Concert.js";

import { sendEmail } from "../services/emailService.js";


export async function addConcert(req, res, next) {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Accès refusé : réservé aux administrateurs." });
    }

    const { title, location, date, ticket_url } = req.validatedBody;
    const image_url = req.file?.path || null;

    if (!title || !location || !date) {
      return res.status(400).json({ error: "Titre, lieu et date sont requis." });
    }

    if (new Date(date) < new Date()) {
      return res.status(400).json({ error: "La date du concert ne peut pas être passée." });
    }

    const newConcert = await createConcert(title, location, date, ticket_url, image_url);

    
    await sendEmail(
      process.env.ADMIN_EMAIL,
      "Nouveau concert ajouté",
      "Un nouveau concert a été ajouté sur Music Band Website.",
      "adminNewConcert.html",
      {
        title,
        location,
        date: new Date(date).toLocaleDateString("fr-FR"),
        ticket_url,
      }
    );

    res.status(201).json({
      success: true,
      message: "Concert créé avec succès et notification envoyée.",
      data: newConcert,
    });
  } catch (error) {
    next(error);
  }
}


export async function fetchConcerts(req, res, next) {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    const concerts = await getAllConcerts(limit, offset);

    res.status(200).json({
      success: true,
      page,
      limit,
      count: concerts.length,
      data: concerts,
    });
  } catch (error) {
    next(error);
  }
}


export async function fetchConcertById(req, res, next) {
  try {
    const concert = await getConcertById(req.params.id);
    if (!concert) {
      return res.status(404).json({ error: "Concert non trouvé." });
    }
    res.status(200).json({ success: true, data: concert });
  } catch (error) {
    next(error);
  }
}


export async function editConcert(req, res, next) {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Accès refusé : réservé aux administrateurs." });
    }

    const { title, location, date, ticket_url } = req.validatedBody;
    const image_url = req.file?.path || null;

    if (!title || !location || !date) {
      return res.status(400).json({ error: "Titre, lieu et date sont requis." });
    }

    const concert = await getConcertById(req.params.id);
    if (!concert) {
      return res.status(404).json({ error: "Concert non trouvé." });
    }

    const success = await updateConcert(req.params.id, title, location, date, ticket_url, image_url);
    if (!success) {
      return res.status(404).json({ error: "Échec de la mise à jour du concert." });
    }

    const updatedConcert = await getConcertById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Concert mis à jour avec succès.",
      data: updatedConcert,
    });
  } catch (error) {
    next(error);
  }
}


export async function removeConcert(req, res, next) {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Accès refusé : réservé aux administrateurs." });
    }

    const concert = await getConcertById(req.params.id);
    if (!concert) {
      return res.status(404).json({ error: "Concert non trouvé." });
    }

    const success = await deleteConcert(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Échec de la suppression du concert." });
    }

    
    await sendEmail(
      process.env.ADMIN_EMAIL,
      "Concert supprimé",
      "Un concert a été supprimé du site Music Band.",
      "adminConcertDeleted.html",
      {
        title: concert.title,
        location: concert.location,
        date: new Date(concert.date).toLocaleDateString("fr-FR"),
      }
    );

    res.status(200).json({
      success: true,
      message: "Concert supprimé avec succès et notification envoyée.",
    });
  } catch (error) {
    next(error);
  }
}


export async function fetchUpcomingConcerts(req, res, next) {
  try {
    const concerts = await getUpcomingConcerts();
    res.status(200).json({
      success: true,
      count: concerts.length,
      data: concerts,
    });
  } catch (error) {
    next(error);
  }
}


export async function fetchPastConcerts(req, res, next) {
  try {
    const concerts = await getPastConcerts();
    res.status(200).json({
      success: true,
      count: concerts.length,
      data: concerts,
    });
  } catch (error) {
    next(error);
  }
}


export async function fetchConcertsByLocation(req, res, next) {
  try {
    const { location } = req.query;
    if (!location) {
      return res.status(400).json({ error: "Le paramètre 'location' est requis." });
    }

    const concerts = await getConcertsByLocation(location);
    res.status(200).json({
      success: true,
      count: concerts.length,
      data: concerts,
    });
  } catch (error) {
    next(error);
  }
}






