import { FaInstagram, FaYoutube, FaSpotify } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      className="bg-[#0A0A0A] text-[#F2F2F2] border-t border-[#B3122D]/60 text-center select-none relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
     
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{
          opacity: [0.5, 0.9, 0.5],
          boxShadow: [
            "0 0 10px #B3122D",
            "0 0 20px #FF4C4C",
            "0 0 10px #B3122D",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
        className="h-[2px] w-full bg-[#B3122D]"
      />

      
      <div className="max-w-6xl mx-auto flex flex-col items-center py-4 md:py-6 gap-4">
        
        <div className="flex justify-center gap-6 text-lg sm:text-xl">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="relative group transition-transform hover:scale-110"
          >
            <FaInstagram className="text-[#B3122D] group-hover:text-[#FFD700] transition-colors duration-300" />
            <span className="absolute -inset-2 rounded-full bg-[#B3122D]/20 blur-md opacity-0 group-hover:opacity-100 transition-all duration-500"></span>
          </a>

          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="relative group transition-transform hover:scale-110"
          >
            <FaYoutube className="text-[#B3122D] group-hover:text-[#FFD700] transition-colors duration-300" />
            <span className="absolute -inset-2 rounded-full bg-[#B3122D]/20 blur-md opacity-0 group-hover:opacity-100 transition-all duration-500"></span>
          </a>

          <a
            href="https://spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Spotify"
            className="relative group transition-transform hover:scale-110"
          >
            <FaSpotify className="text-[#B3122D] group-hover:text-[#FFD700] transition-colors duration-300" />
            <span className="absolute -inset-2 rounded-full bg-[#B3122D]/20 blur-md opacity-0 group-hover:opacity-100 transition-all duration-500"></span>
          </a>
        </div>

        
        <p className="text-[11px] text-[#CCCCCC] tracking-wide">
          © {year} REVEREN — Tous droits réservés.
        </p>
      </div>
    </motion.footer>
  );
}












