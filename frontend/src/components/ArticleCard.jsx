import React from "react";
import Button from "./Button";

export default function ArticleCard({ title, excerpt, image, date, link }) {
  return (
    <article
      className="
        bg-[var(--surface)] rounded-2xl shadow-lg overflow-hidden 
        border border-[var(--border)] hover:border-[var(--accent)]
        transition-all duration-300 flex flex-col
        hover:shadow-[0_0_25px_var(--accent)]
        sm:max-w-none w-full
      "
    >
    
      <div className="relative w-full h-48 sm:h-56 overflow-hidden group">
        <img
          src={image}
          alt={`Image de l’article : ${title}`}
          className="
            w-full h-full object-cover transform transition-transform duration-700 
            sm:group-hover:scale-110 pointer-events-none select-none
          "
          loading="lazy"
          decoding="async"
          draggable="false"
        />

        <div
          aria-hidden="true"
          className="
            absolute inset-0 bg-gradient-to-t 
            from-[color-mix(in_oklab,var(--accent)_25%,transparent)] to-transparent
            opacity-80 sm:opacity-0 sm:group-hover:opacity-100
            transition-opacity duration-500
          "
        ></div>

        <div
          aria-hidden="true"
          className="
            absolute inset-0 bg-gradient-to-tr 
            from-transparent via-[color-mix(in_oklab,var(--accent)_15%,transparent)] to-transparent
            opacity-60 sm:opacity-0 sm:group-hover:opacity-100 
            blur-[2px] transition-opacity duration-700
          "
        ></div>

        <time
          dateTime={date}
          className="
            absolute top-3 left-3 bg-[var(--accent)] text-[var(--bg)]
            text-xs font-bold px-3 py-1 rounded-md shadow-md
          "
        >
          {date}
        </time>
      </div>

      <div className="flex flex-col flex-grow p-5 sm:p-6">
        <h3
          className="
            text-base sm:text-lg font-bold text-[var(--accent)] mb-2 leading-snug 
            sm:group-hover:text-[color-mix(in_oklab,var(--accent)_85%,var(--gold)_15%)] 
            transition-colors duration-300
          "
        >
          {title}
        </h3>

        <p
          className="text-[var(--subtext)] text-sm flex-grow leading-relaxed"
          aria-label="Extrait de l’article"
        >
          {excerpt}
        </p>

        <div className="mt-5 sm:mt-6">
          <Button
            variant="outline"
            as="a"
            href={link}
            aria-label={`Lire l’article complet : ${title}`}
            className="
              border-[var(--accent)] text-[var(--accent)] 
              hover:bg-[var(--accent)] hover:text-[var(--bg)]
              hover:shadow-[0_0_15px_var(--accent)]
              transition-all duration-300 ease-in-out
            "
          >
            Lire plus
          </Button>
        </div>
      </div>
    </article>
  );
}





