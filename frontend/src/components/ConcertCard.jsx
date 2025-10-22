import React from "react";
import Button from "./Button";

export default function ConcertCard({ city, date, location, image, ticketLink }) {
  return (
    <article
      className="
        relative rounded-2xl overflow-hidden bg-surface
        border border-border hover:border-accent
        transition-all duration-500 flex flex-col
        hover:shadow-[0_0_25px_var(--accent)]
        sm:max-w-none w-full
      "
    >
      
      <div className="relative w-full h-52 sm:h-56 md:h-64 overflow-hidden group">
        <img
          src={image}
          alt={`Concert à ${city}`}
          className="
            w-full h-full object-cover transform
            transition-transform duration-700
            sm:group-hover:scale-110 pointer-events-none select-none
          "
          draggable="false"
        />

       
        <div
          className="
            absolute inset-0 bg-gradient-to-t 
            from-[color-mix(in_oklab,var(--bg)_90%,black_10%)] 
            via-[color-mix(in_oklab,var(--bg)_50%,transparent)] 
            to-transparent
            opacity-80 sm:opacity-0 sm:group-hover:opacity-100
            transition-opacity duration-500
          "
        ></div>

        
        <div
          className="
            absolute inset-0 bg-gradient-to-tr 
            from-transparent 
            via-[color-mix(in_oklab,var(--accent)_30%,transparent)] 
            to-transparent
            opacity-40 sm:opacity-0 sm:group-hover:opacity-100
            blur-[3px] transition-opacity duration-700
          "
        ></div>

       
        <div className="absolute top-3 left-3 bg-accent text-bg font-semibold text-xs px-3 py-1 rounded shadow-md">
          {date}
        </div>
      </div>

      
      <div className="flex flex-col flex-grow p-5 sm:p-6 text-center sm:text-left">
        <h3
          className="
            text-lg sm:text-xl font-bold text-gold
            mb-1 sm:group-hover:text-[color-mix(in_oklab,var(--gold)_80%,var(--accent)_20%)]
            transition-colors duration-300
          "
        >
          {city}
        </h3>
        <p className="text-subtext text-sm mb-4">{location}</p>

        
        <div className="flex justify-center sm:justify-start">
          <Button
            variant="primary"
            as="a"
            href={ticketLink}
            target="_blank"
            className="
              bg-accent text-bg font-semibold px-5 py-2 rounded-lg
              hover:bg-[color-mix(in_oklab,var(--accent)_85%,var(--gold)_15%)]
              hover:shadow-[0_0_20px_var(--accent)]
              transition-all duration-300
            "
          >
            Réserver
          </Button>
        </div>
      </div>
    </article>
  );
}


