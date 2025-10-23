import { FaInstagram, FaYoutube, FaSpotify } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      className="
        relative overflow-hidden select-none text-center
        bg-[var(--bg)] text-[var(--text)]
        transition-colors duration-700 ease-in-out
        mt-0 pt-0
      "
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    >
     
      <motion.div
        initial={{ opacity: 0.4 }}
        animate={{
          opacity: [0.4, 0.8, 0.4],
          boxShadow: [
            "0 0 12px var(--accent)",
            "0 0 18px var(--gold)",
            "0 0 12px var(--accent)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="
          absolute top-0 left-0 w-full h-[2px]
          bg-[var(--accent)]
          shadow-[0_0_18px_var(--accent)]
          z-50
        "
      />

     
      <div
        className="
          absolute top-0 left-0 w-full h-[80px]
          bg-gradient-to-b from-[var(--accent)]/20 via-transparent to-transparent
          pointer-events-none
        "
      ></div>

     
      <div className="max-w-6xl mx-auto flex flex-col items-center py-8 md:py-10 gap-5 relative z-10">
        
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
              className="
                relative group transition-transform duration-300 hover:scale-110
              "
            >
              <Icon
                className="
                  text-[var(--accent)] group-hover:text-[var(--gold)]
                  transition-colors duration-300
                "
              />
              <span
                className="
                  absolute -inset-2 rounded-full bg-[var(--accent)]/20 blur-md 
                  opacity-0 group-hover:opacity-100 
                  transition-all duration-500
                "
              ></span>
            </a>
          ))}
        </div>

       
        <p className="text-xs text-[var(--subtext)] tracking-wide">
          © {year}{" "}
          <span className="text-[var(--accent)] font-semibold">REVEREN</span> — Tous droits réservés.
        </p>
      </div>
    </motion.footer>
  );
}
















