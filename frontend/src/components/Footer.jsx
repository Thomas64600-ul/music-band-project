import { FaInstagram, FaYoutube, FaSpotify } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0B0F17] text-gray-400 border-t border-gray-800 text-center select-none">
     
      <div className="h-[1px] w-full bg-[#FFD700]" />

      <div className="max-w-6xl mx-auto flex flex-col items-center py-3 md:py-4 gap-3">
       
        <div className="flex justify-center gap-6 text-lg sm:text-xl">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="relative group transition-transform hover:scale-110"
          >
            <FaInstagram className="text-gray-400 group-hover:text-[#FFD700] transition-colors duration-300" />
            
            <span className="absolute -inset-2 rounded-full bg-[#FFD700]/20 blur-md opacity-0 group-hover:opacity-100 transition-all duration-500"></span>
          </a>

          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="relative group transition-transform hover:scale-110"
          >
            <FaYoutube className="text-gray-400 group-hover:text-[#FFD700] transition-colors duration-300" />
            <span className="absolute -inset-2 rounded-full bg-[#FFD700]/20 blur-md opacity-0 group-hover:opacity-100 transition-all duration-500"></span>
          </a>

          <a
            href="https://spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Spotify"
            className="relative group transition-transform hover:scale-110"
          >
            <FaSpotify className="text-gray-400 group-hover:text-[#FFD700] transition-colors duration-300" />
            <span className="absolute -inset-2 rounded-full bg-[#FFD700]/20 blur-md opacity-0 group-hover:opacity-100 transition-all duration-500"></span>
          </a>
        </div>

      
        <p className="text-[10px] text-gray-500">
          © {year} REVEREN — Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}










