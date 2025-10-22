import { FaInstagram, FaYoutube, FaSpotify } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      className="
        bg-[var(--bg)] text-[var(--text)] 
        border-t border-[var(--border)]/70 text-center select-none 
        relative overflow-hidden
      "
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    >
      
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{
          opacity: [0.5, 0.9, 0.5],
          boxShadow: [
            "0 0 10px var(--accent)",
            "0 0 20px var(--gold)",
            "0 0 10px var(--accent)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
        className="h-[2px] w-full bg-[var(--accent)]"
      />

     
      <div className="max-w-6xl mx-auto flex flex-col items-center py-5 md:py-8 gap-4">
        
       
        <div className="flex justify-center gap-6 text-lg sm:text-xl">
          {[
            { Icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
            { Icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
            { Icon: FaSpotify, href: "https://spotify.com", label: "Spotify" },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="relative group transition-transform hover:scale-110"
            >
              <Icon className="text-[var(--accent)] group-hover:text-[var(--gold)] transition-colors duration-300" />
              <span className="absolute -inset-2 rounded-full bg-[var(--accent)]/20 blur-md opacity-0 group-hover:opacity-100 transition-all duration-500"></span>
            </a>
          ))}
        </div>

       
        <p className="text-[12px] text-[var(--subtext)] tracking-wide">
          © {year} <span className="text-[var(--accent)] font-semibold">REVEREN</span> — Tous droits réservés.
        </p>
      </div>
    </motion.footer>
  );
}












