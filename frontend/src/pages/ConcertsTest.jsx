import React from "react";
import ConcertCard from "../components/ConcertCard";

export default function Concerts() {
  const concerts = [
    {
      city: "Bordeaux",
      date: "10 Nov 2025",
      location: "Rock School Barbey",
      image: "/src/assets/concert1.jpg",
      ticketLink: "https://www.ticketmaster.fr/",
    },
    {
      city: "Paris",
      date: "15 Nov 2025",
      location: "Le Trianon",
      image: "/src/assets/concert2.jpg",
      ticketLink: "https://www.fnacspectacles.com/",
    },
    {
      city: "Lyon",
      date: "20 Nov 2025",
      location: "Ninkasi Kao",
      image: "/src/assets/concert3.jpg",
      ticketLink: "https://www.digitick.com/",
    },
  ];

  return (
    <section className="bg-[#0A0A0A] text-[#F2F2F2]">
      {/* 🟡 Bandeau défilant */}
      <div className="overflow-hidden border-y border-[#FFD70040] bg-[#0B0F17] py-3">
        <div
          className="flex whitespace-nowrap animate-marquee text-[#FFD700] font-semibold text-sm sm:text-base tracking-widest"
        >
          {concerts.map((concert, index) => (
            <span key={index} className="mx-6">
              {concert.date} — {concert.city.toUpperCase()} • {concert.location}
            </span>
          ))}
        </div>
      </div>

    
      <h2 className="text-3xl font-bold text-center text-[#FFD700] mt-12 mb-10">
        🎶 Prochains concerts
      </h2>
{/* 🪩 Grille des concerts */}
      <div className="px-6 sm:px-12 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {concerts.map((concert, index) => (
          <ConcertCard key={index} {...concert} />
        ))}
      </div>
    </section>
  );
}
