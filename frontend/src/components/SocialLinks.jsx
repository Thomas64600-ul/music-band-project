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
    <div className="flex flex-col items-center gap-6 mt-10">
      {/* Titre */}
      <h3 className="text-2xl font-bold text-[#B3122D] drop-shadow-[0_0_6px_#B3122D80]">
        Réseaux & Liens
      </h3>

      {/* Liens sociaux */}
      <div className="flex flex-wrap justify-center gap-6">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0A0A0A] text-[#F2F2F2] border border-[#B3122D80] hover:border-[#B3122D] hover:text-[#F2F2F2] hover:bg-[#B3122D] hover:shadow-[0_0_20px_#B3122D60] transition-all duration-300 text-sm sm:text-base"
          >
            <span className="text-[#B3122D] group-hover:text-[#F2F2F2] transition-colors duration-300">
              {link.icon}
            </span>
            <span className="font-medium">{link.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
