import React from "react";
import Button from "./Button";

export default function ArticleCard({ title, excerpt, image, date, link }) {
  return (
    <article
      className="
        bg-[#0B0F17] rounded-2xl shadow-lg overflow-hidden 
        border border-transparent hover:border-[#FFD700]
        transition-all duration-300 flex flex-col
        hover:shadow-[0_0_20px_#FFD70040]
        sm:max-w-none w-full
      "
    >
      {/* 🖼️ Image de couverture avec effet glass */}
      <div className="relative w-full h-48 sm:h-56 overflow-hidden group">
        <img
          src={image}
          alt={title}
          className="
            w-full h-full object-cover transform transition-transform duration-700 
            sm:group-hover:scale-110 pointer-events-none select-none
          "
          draggable="false"
        />

        {/* 🟡 Overlay doré (effet glass) */}
        <div
          className="
            absolute inset-0 bg-gradient-to-t from-[#FFD70033] to-transparent
            opacity-80 sm:opacity-0 sm:group-hover:opacity-100
            transition-opacity duration-500
          "
        ></div>

        {/* ✨ Brillance diagonale */}
        <div
          className="
            absolute inset-0 bg-gradient-to-tr from-transparent via-[#FFD70022] to-transparent
            opacity-60 sm:opacity-0 sm:group-hover:opacity-100 
            blur-[2px] transition-opacity duration-700
          "
        ></div>

        {/* 🗓️ Badge date */}
        <div className="absolute top-3 left-3 bg-[#FFD700] text-black text-xs font-bold px-3 py-1 rounded-md shadow">
          {date}
        </div>
      </div>

      {/* 📰 Contenu texte */}
      <div className="flex flex-col flex-grow p-5 sm:p-6">
        <h3
          className="
            text-base sm:text-lg font-bold text-[#FFD700] mb-2 leading-snug 
            sm:group-hover:text-[#FFE55A] transition-colors duration-300
          "
        >
          {title}
        </h3>

        <p className="text-gray-300 text-sm flex-grow leading-relaxed">
          {excerpt}
        </p>

        <div className="mt-5 sm:mt-6">
          <Button variant="outline" as="a" href={link}>
            Lire plus
          </Button>
        </div>
      </div>
    </article>
  );
}


