# Site Web – Groupe de musique

Projet de fin de formation – Développeur Web  
Site web pour un **groupe de musique** : deux artistes qui mélangent solos de guitare et électro.

---

## 🎯 Objectifs du projet
- Mettre en avant la musique du groupe avec un lecteur audio.
- Présenter les concerts à venir (réservation en ligne).
- Proposer un blog d’actualités.
- Mettre en place une cagnotte pour soutenir le groupe.
- Intégrer un formulaire de contact et un Linktree (liens rapides vers les réseaux).

---

## 📂 Structure du projet



music-band-project/
│
├── backend/ # API Node.js + Express + SQL
│ ├── app.js
│ ├── routes/
│ ├── controllers/
│ ├── models/
│ ├── config/
│ └── .env.example
│
├── frontend/ # Interface utilisateur React + Vite + Tailwind
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ └── App.jsx
│ ├── package.json
│ └── tailwind.config.js
│
├── .gitignore
└── README.md


---

## ⚙️ Technologies utilisées
- **Frontend :** React + Vite + Tailwind CSS  
- **Backend :** Node.js + Express  
- **Base de données :** MySQL (gérée via phpMyAdmin)  
- **Déploiement :**
  - Backend → Render / Railway  
  - Frontend → Vercel / Netlify  
  - BDD → OVH / PlanetHoster  

---

## 🚀 Installation & lancement

### 1. Lancer le Backend (API)
```bash
cd backend
npm install
npm run dev

