// src/components/SocialLinks.jsx
import React from "react";
import { FaInstagram, FaYoutube, FaSpotify, FaLink } from "react-icons/fa";

export default function SocialLinks() {
  const links = [
    { name: "Instagram", icon: <FaInstagram />, url: "https://instagram.com" },
    { name: "YouTube", icon: <FaYoutube />, url: "https://youtube.com" },
    { name: "Spotify", icon: <FaSpotify />, url: "https://spotify.com" },
    { name: "Site officiel", icon: <FaLink />, url: "https://reveren.com" },
  ];

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <h3 className="text-2xl font-bold text-[#FFD700] mb-4">Réseaux & Liens</h3>
      <div className="flex flex-wrap justify-center gap-6">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#111] text-[#FFD700] border border-[#FFD700] hover:bg-[#FFD700] hover:text-black transition-all duration-300 shadow-lg"
          >
            {link.icon}
            <span>{link.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
