import {
  createConcert,
  getAllConcerts,
  getConcertById,
  updateConcert,
  deleteConcert,
  getUpcomingConcerts,
  getConcertsByLocation
} from "../models/Concert.js";


export async function addConcert(req, res) {
  try {
    const { title, location, date, ticket_url } = req.body;
    if (!title || !location || !date) {
      return res.status(400).json({ error: "Titre, lieu et date sont requis" });
    }

    const newConcert = await createConcert(title, location, date, ticket_url);
    res.status(201).json(newConcert);
  } catch (error) {
    console.error("Erreur ajout concert:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}


export async function fetchConcerts(req, res) {
  try {
    const concerts = await getAllConcerts();
    res.json(concerts);
  } catch (error) {
    console.error("Erreur récupération concerts:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}


export async function fetchConcertById(req, res) {
  try {
    const concert = await getConcertById(req.params.id);
    if (!concert) {
      return res.status(404).json({ error: "Concert non trouvé" });
    }
    res.json(concert);
  } catch (error) {
    console.error("Erreur récupération concert:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function editConcert(req, res) {
  try {
    const { title, location, date, ticket_url } = req.body;
    if (!title || !location || !date) {
      return res.status(400).json({ error: "Titre, lieu et date sont requis" });
    }

    const success = await updateConcert(req.params.id, title, location, date, ticket_url);
    if (!success) {
      return res.status(404).json({ error: "Concert non trouvé" });
    }

    const updatedConcert = await getConcertById(req.params.id);
    res.json(updatedConcert);
  } catch (error) {
    console.error("Erreur mise à jour concert:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}


export async function removeConcert(req, res) {
  try {
    const success = await deleteConcert(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Concert non trouvé" });
    }
    res.json({ message: "Concert supprimé avec succès" });
  } catch (error) {
    console.error("Erreur suppression concert:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}


export async function fetchUpcomingConcerts(req, res) {
  try {
    const concerts = await getUpcomingConcerts();
    res.json(concerts);
  } catch (error) {
    console.error("Erreur récupération concerts à venir:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}


export async function fetchConcertsByLocation(req, res) {
  try {
    const { location } = req.params;
    const concerts = await getConcertsByLocation(location);
    res.json(concerts);
  } catch (error) {
    console.error("Erreur récupération concerts par lieu:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

