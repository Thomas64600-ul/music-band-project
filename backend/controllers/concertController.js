import {
  createConcert,
  getAllConcerts,
  getConcertById,
  updateConcert,
  deleteConcert,
  getUpcomingConcerts,
  getConcertsByLocation
} from "../models/Concert.js";

export async function addConcert(req, res, next) {
  try {
    const { title, location, date, ticket_url } = req.validatedBody;
    const imageUrl = req.file?.path || null;

    if (!title || !location || !date) {
      return res.status(400).json({ error: "Titre, lieu et date sont requis" });
    }

    const newConcert = await createConcert(title, location, date, ticket_url, imageUrl);
    res.status(201).json(newConcert);
  } catch (error) {
    next(error);
  }
}

export async function fetchConcerts(req, res, next) {
  try {
    const concerts = await getAllConcerts();
    res.json(concerts);
  } catch (error) {
    next(error);
  }
}

export async function fetchConcertById(req, res, next) {
  try {
    const concert = await getConcertById(req.params.id);
    if (!concert) {
      return res.status(404).json({ error: "Concert non trouvé" });
    }
    res.json(concert);
  } catch (error) {
    next(error);
  }
}

export async function editConcert(req, res, next) {
  try {
    const { title, location, date, ticket_url } = req.validatedBody;
    const imageUrl = req.file?.path || null;

    if (!title || !location || !date) {
      return res.status(400).json({ error: "Titre, lieu et date sont requis" });
    }

    const success = await updateConcert(req.params.id, title, location, date, ticket_url, imageUrl);
    if (!success) {
      return res.status(404).json({ error: "Concert non trouvé" });
    }

    const updatedConcert = await getConcertById(req.params.id);
    res.json(updatedConcert);
  } catch (error) {
    next(error);
  }
}

export async function removeConcert(req, res, next) {
  try {
    const success = await deleteConcert(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Concert non trouvé" });
    }
    res.json({ message: "Concert supprimé avec succès" });
  } catch (error) {
    next(error);
  }
}

export async function fetchUpcomingConcerts(req, res, next) {
  try {
    const concerts = await getUpcomingConcerts();
    res.json(concerts);
  } catch (error) {
    next(error);
  }
}

export async function fetchConcertsByLocation(req, res, next) {
  try {
    const { location } = req.params;
    const concerts = await getConcertsByLocation(location);
    res.json(concerts);
  } catch (error) {
    next(error);
  }
}



