import React from "react";
import Button from "./Button";

export default function ArticleCard({ title, excerpt, image, date, link }) {
  return (
    <article
      className="
        bg-[#0A0A0A] rounded-2xl shadow-lg overflow-hidden 
        border border-[#B3122D40] hover:border-[#B3122D]
        transition-all duration-300 flex flex-col
        hover:shadow-[0_0_25px_#B3122D60]
        sm:max-w-none w-full
      "
    >
      
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

        
        <div
          className="
            absolute inset-0 bg-gradient-to-t from-[#B3122D33] to-transparent
            opacity-80 sm:opacity-0 sm:group-hover:opacity-100
            transition-opacity duration-500
          "
        ></div>

        <div
          className="
            absolute inset-0 bg-gradient-to-tr from-transparent via-[#B3122D22] to-transparent
            opacity-60 sm:opacity-0 sm:group-hover:opacity-100 
            blur-[2px] transition-opacity duration-700
          "
        ></div>

        
        <div className="absolute top-3 left-3 bg-[#B3122D] text-[#F2F2F2] text-xs font-bold px-3 py-1 rounded-md shadow-md">
          {date}
        </div>
      </div>

      
      <div className="flex flex-col flex-grow p-5 sm:p-6">
        <h3
          className="
            text-base sm:text-lg font-bold text-[#B3122D] mb-2 leading-snug 
            sm:group-hover:text-[#E01E37] transition-colors duration-300
          "
        >
          {title}
        </h3>

        <p className="text-gray-400 text-sm flex-grow leading-relaxed">
          {excerpt}
        </p>

        
        <div className="mt-5 sm:mt-6">
          <Button
            variant="outline"
            as="a"
            href={link}
            className="border-[#B3122D] text-[#B3122D] hover:bg-[#B3122D] hover:text-[#F2F2F2] hover:shadow-[0_0_15px_#B3122D80]"
          >
            Lire plus
          </Button>
        </div>
      </div>
    </article>
  );
}



