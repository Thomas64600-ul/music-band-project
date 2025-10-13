import ConcertCard from "../components/ConcertCard";

export default function Concerts() {
  const concerts = [
    {
      city: "Bordeaux",
      date: "10 Nov 2025",
      location: "Rock School Barbey",
      image: "/src/assets/concert1.png",
      ticketLink: "https://www.ticketmaster.fr/",
    },
    {
      city: "Paris",
      date: "15 Nov 2025",
      location: "Le Trianon",
      image: "/src/assets/concert2.png",
      ticketLink: "https://www.fnacspectacles.com/",
    },
    {
      city: "Lyon",
      date: "20 Nov 2025",
      location: "Ninkasi Kao",
      image: "/src/assets/concert3.png",
      ticketLink: "https://www.digitick.com/",
    },
  ];

  return (
    <section className="px-6 sm:px-12 py-16 bg-[#0A0A0A]">
      <h2 className="text-3xl font-bold text-center text-[#FFD700] mb-12">
        Prochains concerts
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {concerts.map((concert, index) => (
          <ConcertCard key={index} {...concert} />
        ))}
      </div>
    </section>
  );
}