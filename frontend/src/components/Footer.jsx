import { FaInstagram, FaYoutube, FaSpotify } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      role="contentinfo"
      aria-label="Pied de page du site REVEREN"
     className="
  relative flex flex-col items-center justify-center
  h-[70px] w-full overflow-hidden select-none text-center
  bg-[var(--bg)] text-[var(--text)]
  border-t-2 border-[var(--accent)]
  transition-colors duration-700 ease-in-out
  z-[50]
"


      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    >
    
      <motion.div
        aria-hidden="true"
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

      
      <div className="max-w-6xl mx-auto flex flex-col items-center py-8 md:py-10 gap-5 relative z-10">
    
        <nav
          aria-label="Liens vers les réseaux sociaux du groupe REVEREN"
          className="flex justify-center gap-6 text-lg sm:text-xl"
        >
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
              aria-label={`Ouvrir la page ${label} de REVEREN dans un nouvel onglet`}
              title={`REVEREN sur ${label}`}
              className="
                relative group transition-transform duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/50 rounded-full p-1
              "
            >
              <Icon
                aria-hidden="true"
                focusable="false"
                className="
                  text-[var(--accent)] group-hover:text-[var(--gold)]
                  transition-colors duration-300
                "
              />
              <span
                aria-hidden="true"
                className="
                  absolute -inset-2 rounded-full bg-[var(--accent)]/20 blur-md 
                  opacity-0 group-hover:opacity-100 
                  transition-all duration-500
                "
              ></span>
            </a>
          ))}
        </nav>

        <p
          className="text-xs text-[var(--subtext)] tracking-wide"
          role="contentinfo"
        >
          © {year}{" "}
          <span className="text-[var(--accent)] font-semibold">REVEREN</span> — Tous droits réservés.
        </p>
      </div>
    </motion.footer>
  );
}















