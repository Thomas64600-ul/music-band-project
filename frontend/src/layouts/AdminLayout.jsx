import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import { useLocation } from "react-router-dom";

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div
      className="
        flex relative
        bg-[var(--bg)] text-[var(--text)]
        transition-colors duration-700
        pt-[80px] min-h-screen
      "
    >
    
      <aside
        className="
          hidden md:block fixed
          top-[80px] left-0
          h-[calc(100vh-80px)] z-30
        "
        role="navigation"
        aria-label="Navigation administrateur"
      >
        <AdminSidebar />
      </aside>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            key="mobile-sidebar"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu administrateur"
            className="
              fixed inset-y-0 left-0 z-50 w-64
              bg-[var(--bg-secondary)] text-[var(--text)]
              border-r border-[var(--accent)]/40
              shadow-[0_0_25px_var(--accent)]/30
              md:hidden
            "
          >
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Fermer le menu administrateur"
                className="text-[var(--accent)] hover:text-[var(--gold)] transition"
              >
                <X size={26} />
              </button>
            </div>
            <AdminSidebar />
          </motion.aside>
        )}
      </AnimatePresence>

      <main
        className="
          flex-1 md:ml-64
          p-6 sm:p-8
          transition-all duration-300
          bg-[var(--bg)] text-[var(--text)]
          min-h-[calc(100vh-80px)]
          overflow-y-auto overflow-x-auto
          scrollbar-thin scrollbar-thumb-[var(--accent)] scrollbar-track-transparent
        "
        id="admin-main-content"
      >
 
        {!isAdminPage && (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Ouvrir le menu administrateur"
            aria-controls="mobile-sidebar"
            aria-expanded={isOpen}
            className="
              md:hidden fixed top-[90px] left-4 z-40
              bg-[var(--accent)] text-white
              p-2 rounded-lg shadow-[0_0_15px_var(--accent)]/40
              hover:bg-[var(--gold)] hover:text-[var(--bg)]
              focus-visible:ring-2 focus-visible:ring-[var(--accent)]/50
              transition-all duration-300
            "
          >
            <Menu size={22} />
          </button>
        )}

        {children}
      </main>

      {isOpen && (
        <div
          role="presentation"
          aria-hidden="true"
          className="
            fixed inset-0 bg-black/50 backdrop-blur-sm
            md:hidden z-40 cursor-pointer
          "
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}


