import React from "react";
import Button from "./Button";

export default function ConcertCard({ city, date, location, image, ticketLink }) {
  return (
    <article
      className="
        relative rounded-2xl overflow-hidden
        bg-[var(--surface)] text-[var(--text)]
        border border-[var(--border)]
        hover:border-[var(--accent)]
        transition-all duration-500 flex flex-col
        hover:shadow-[0_0_25px_var(--accent)]
        sm:max-w-none w-full
      "
      aria-label={`Concert ${city ? `à ${city}` : "à venir"}`}
    >
    
      <div className="relative w-full h-52 sm:h-56 md:h-64 overflow-hidden group">
        <img
          src={image}
          alt={city ? `Affiche du concert à ${city}` : "Affiche du concert"}
          loading="lazy"
          decoding="async"
          className="
            w-full h-full object-cover transform
            transition-transform duration-700
            sm:group-hover:scale-110 pointer-events-none select-none
          "
          draggable="false"
        />

        <div
          aria-hidden="true"
          className="
            absolute inset-0 bg-gradient-to-t 
            from-[var(--bg)]/90 via-[var(--bg)]/40 to-transparent
            opacity-80 sm:opacity-0 sm:group-hover:opacity-100
            transition-opacity duration-500
          "
        ></div>

        <div
          aria-hidden="true"
          className="
            absolute inset-0 bg-gradient-to-tr 
            from-transparent via-[var(--accent)]/25 to-transparent
            opacity-40 sm:opacity-0 sm:group-hover:opacity-100
            blur-[3px] transition-opacity duration-700
          "
        ></div>

        <time
          dateTime={date}
          className="
            absolute top-3 left-3 bg-[var(--accent)] text-[var(--surface)] 
            font-semibold text-xs px-3 py-1 rounded shadow-md
          "
        >
          {date || "Date à venir"}
        </time>
      </div>

      <div className="flex flex-col flex-grow p-5 sm:p-6 text-center sm:text-left">
        <h3
          className="
            text-lg sm:text-xl font-bold text-[var(--accent)]
            mb-1 sm:group-hover:text-[var(--gold)] transition-colors
          "
        >
          {city || "Concert à venir"}
        </h3>

        <p className="text-[var(--subtext)] text-sm mb-4">
          {location || "Lieu à confirmer"}
        </p>

        <div className="flex justify-center sm:justify-start">
          <Button
            variant="primary"
            as="a"
            href={ticketLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={
              ticketLink
                ? `Réserver une place pour le concert à ${city}`
                : "Lien de réservation indisponible"
            }
            disabled={!ticketLink}
          >
            Réserver
          </Button>
        </div>
      </div>
    </article>
  );
}


