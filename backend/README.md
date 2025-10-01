Music Band API – Documentation
Description

Cette API permet de gérer un site de groupe de musique :

Gestion des utilisateurs avec authentification JWT

CRUD articles (blog)

Gestion des concerts

Gestion des dons (cagnotte)

Gestion des messages (contact)

Technologies : Node.js, Express, MySQL, JWT, Joi.

Authentification

Register → POST /api/users/register

Login → POST /api/users/login (renvoie un token JWT)

Logout → POST /api/users/logout

Toutes les routes sensibles nécessitent un token dans le header :

Authorization: Bearer <token>

Utilisateurs
Créer un utilisateur

POST /api/users/register

{
  "firstname": "Thomas",
  "lastname": "Dupont",
  "email": "thomas@test.com",
  "password": "123456",
  "role": "admin"
}

écupérer tous les utilisateurs (admin only)

GET /api/users

Récupérer un utilisateur par ID

GET /api/users/:id

Modifier un utilisateur

PUT /api/users/:id

Supprimer un utilisateur (admin only)

DELETE /api/users/:id

Articles
Créer un article (admin)

POST /api/articles

{
  "title": "Nouveau concert",
  "content": "On sera à Paris en octobre !",
  "author_id": 1
}

Récupérer tous les articles

GET /api/articles

Récupérer un article par ID

GET /api/articles/:id

Modifier un article (admin)

PUT /api/articles/:id

Supprimer un article (admin)

DELETE /api/articles/:id

Concerts
Créer un concert (admin)

POST /api/concerts

{
  "title": "Concert Paris",
  "location": "Bataclan",
  "date": "2025-11-12",
  "ticket_url": "https://tickets.com/paris"
}

Récupérer tous les concerts

GET /api/concerts

Récupérer un concert par ID

GET /api/concerts/:id

Modifier un concert (admin)

PUT /api/concerts/:id

Supprimer un concert (admin)

DELETE /api/concerts/:id

Récupérer concerts à venir

GET /api/concerts/upcoming

Récupérer concerts par lieu

GET /api/concerts/location/:location

Donations
Ajouter un don

POST /api/donations

{
  "user_id": 1,
  "amount": 20,
  "message": "Bravo pour votre musique !"
}
Récupérer tous les dons

GET /api/donations

Récupérer un don par ID

GET /api/donations/:id

Récupérer les dons d’un utilisateur

GET /api/donations/user/:user_id

Statistiques globales des dons

GET /api/donations/stats/global

Supprimer un don (admin)

DELETE /api/donations/:id

Messages
Envoyer un message

POST /api/messages

{
  "name": "Thomas",
  "email": "thomas@test.com",
  "message": "J'adore vos morceaux !"
}

Récupérer tous les messages (admin)

GET /api/messages

Récupérer un message par ID

GET /api/messages/:id

Récupérer messages par email

GET /api/messages/email/:email

Marquer un message comme lu

PUT /api/messages/:id/read

Supprimer un message (admin)

DELETE /api/messages/:id

Déploiement

Backend : Render (Node.js + MySQL)

Frontend : Vercel (React + Tailwind)

BDD : MySQL (OVH / PlanetHoster / Railway)