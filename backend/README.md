# REVEREN - Back-End API

> API REST complète et sécurisée pour la plateforme du groupe de musique **REVEREN** (rock / électro duo).  
> Développée en **Node.js / Express / PostgreSQL**, avec intégration de **Stripe, Mailjet et Cloudinary**.  
> Fournit toutes les fonctionnalités du site : authentification, blog, concerts, musiques, cagnotte, commentaires et messagerie.

---

## Installation

### 1. Cloner le dépôt
```bash
git clone https://github.com/Thomas/REVEREN-backend.git
cd REVEREN-backend

2. Installer les dépendances
npm install

3. Configurer l’environnement

# Port du serveur
PORT=5000

# PostgreSQL (Render ou local)
DATABASE_URL_EXTERNAL=
DATABASE_URL_INTERNAL=
RENDER=false

# Authentification
JWT_SECRET=

# URL du client (React)
CLIENT_URL=https://music-band-project-five.vercel.app

# Email (Mailjet)
MAIL_HOST=in-v3.mailjet.com
MAIL_PORT=587
MAIL_USER=
MAIL_PASS=
ADMIN_EMAIL=admin@contactfastasturtlerecords.fr

# Cloudinary (uploads)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Stripe (paiement sécurisé)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

4. Lancer le serveur
npm run dev
Le back-end est accessible sur :
http://localhost:5000

Structure du projet
backend/
│
├── app.js                  # Configuration principale du serveur Express
├── server.js               # Point d'entrée du serveur
│
├── config/
│   ├── db.js               # Connexion PostgreSQL
│   ├── cloudinary.js       # Configuration Cloudinary
│
├── controllers/            # Logique métier (Articles, Users, Musics, etc.)
├── routes/                 # Routes REST associées
├── models/                 # Requêtes SQL via Pool PostgreSQL
├── middlewares/            # Auth, rôles, validation, rate limiter, etc.
├── services/
│   └── emailService.js     # Envoi d'emails (Mailjet)
│
├── templates/              # Modèles HTML pour les emails
├── .env                    # Variables d’environnement
└── package.json

Fonctionnalités principales

| Catégorie                   | Description                                                                           |
| --------------------------- | ------------------------------------------------------------------------------------- |
| **Authentification JWT**    | Connexion, inscription, vérification d’email et gestion sécurisée par cookie HTTPOnly |
| **Gestion des rôles**       | Accès administrateur restreint à certaines routes                                     |
| **CRUD complet**            | Utilisateurs, Articles, Concerts, Musiques, Donations, Messages, Commentaires         |
| **Paiement Stripe**         | Session Checkout sécurisée + Webhook de confirmation                                  |
| **Stockage Cloudinary**     | Upload d’images (articles, concerts) et de fichiers audio (musiques)                  |
| **Envoi d’e-mails Mailjet** | Notifications administrateur et confirmations utilisateurs                            |
| **Sécurité**                | Helmet, CORS, Rate Limiting, compression Brotli, validation Joi                       |
| **Logs & erreurs**          | Middleware global `errorHandler` et surveillance console                              |
| **Performances**            | Compression, cache statique `dist`, base PostgreSQL optimisée                         |

Architecture technique

Le back-end suit une structure MVC claire :
Routes → Controllers → Models → PostgreSQL
                ↓
          Middlewares (auth, validation)
                ↓
          Services externes (Mailjet, Cloudinary, Stripe)
Les routes REST communiquent avec le front-end React hébergé sur Vercel, et les données sont stockées dans PostgreSQL (Render).

Dépendances principales

| Package                                    | Utilité                         |
| ------------------------------------------ | ------------------------------- |
| **express**                                | Serveur web principal           |
| **pg**                                     | Connexion PostgreSQL            |
| **jsonwebtoken**                           | Authentification JWT            |
| **bcrypt**                                 | Hash des mots de passe          |
| **helmet**                                 | Sécurité HTTP                   |
| **cors**                                   | Gestion du cross-origin (CORS)  |
| **morgan**                                 | Logs HTTP                       |
| **compression**                            | Optimisation des réponses       |
| **stripe**                                 | Paiement en ligne               |
| **cloudinary / multer-storage-cloudinary** | Gestion des uploads             |
| **node-mailjet**                           | Envoi d’e-mails transactionnels |
| **joi**                                    | Validation des données          |


Déploiement

| Service        | Usage                                              |
| -------------- | -------------------------------------------------- |
| **Render**     | Hébergement du back-end Node.js et base PostgreSQL |
| **Vercel**     | Hébergement du front-end React                     |
| **Cloudinary** | Stockage des fichiers médias                       |
| **Stripe**     | Paiement sécurisé en ligne                         |
| **Mailjet**    | Envoi d’e-mails transactionnels                    |
| **GitHub**     | Versioning et documentation du code                |

API REST - Endpoints principaux

| Ressource     | Méthode  | Endpoint                                 | Description                    |
| ------------- | -------- | ---------------------------------------- | ------------------------------ |
| **Users**     | `POST`   | `/api/users/register`                    | Inscription utilisateur        |
|               | `POST`   | `/api/users/login`                       | Connexion                      |
|               | `GET`    | `/api/users/me`                          | Profil connecté                |
|               | `GET`    | `/api/users/`                            | Liste des utilisateurs (admin) |
| **Articles**  | `GET`    | `/api/articles`                          | Liste des articles             |
|               | `POST`   | `/api/articles`                          | Ajouter un article (admin)     |
|               | `PUT`    | `/api/articles/:id`                      | Modifier un article            |
|               | `DELETE` | `/api/articles/:id`                      | Supprimer un article           |
| **Concerts**  | `GET`    | `/api/concerts`                          | Liste des concerts             |
|               | `POST`   | `/api/concerts`                          | Ajouter un concert (admin)     |
| **Musics**    | `GET`    | `/api/musics`                            | Liste des musiques             |
|               | `POST`   | `/api/musics`                            | Upload musique (admin)         |
| **Donations** | `POST`   | `/api/donations/create-checkout-session` | Paiement Stripe                |
|               | `POST`   | `/api/donations/webhook`                 | Webhook Stripe                 |
| **Messages**  | `POST`   | `/api/messages`                          | Envoyer un message de contact  |
| **Comments**  | `POST`   | `/api/comments`                          | Ajouter un commentaire         |
| **Stats**     | `GET`    | `/api/stats`                             | Statistiques globales (admin)  |


Auteur

Thomas de Traversay
Développeur Web Full Stack Junior
France
Projet professionnel : REVEREN - Music Band Platform
Technologies : Node.js • React • PostgreSQL • Tailwind • Stripe • Cloudinary • Mailjet

Licence

Ce projet est sous licence ISC.
© 2025 Thomas de Traversay – Tous droits réservés.