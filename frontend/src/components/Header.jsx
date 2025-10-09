import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/logo.png";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-reveren-black text-reveren-white border-b border-reveren-gray fixed top-0 w-full z-50">
      <div className="flex items-center justify-between h-14 px-4">
        
        {/* LOGO */}
        <img src={logo} alt="Logo Reveren" className="w-10 h-10" />

        {/* THEME TOGGLE */}
        <ThemeToggle />

        {/* BURGER MENU (mobile) */}
        <button
          onClick={toggleMenu}
          className="text-reveren-gold text-2xl md:hidden"
          aria-label="Ouvrir le menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* NAVIGATION (desktop) */}
        <nav className="hidden md:flex gap-8 text-sm uppercase tracking-widest">
          {["Home", "Concerts", "Blog", "Support"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-reveren-gold transition"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>

      {/* MENU MOBILE */}
      <div
        className={`md:hidden bg-reveren-black border-t border-reveren-gray flex flex-col items-center overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {["Home", "Concerts", "Blog", "Support"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={closeMenu}
            className="py-3 w-full text-center border-b border-reveren-gray hover:text-reveren-gold"
          >
            {item}
          </a>
        ))}
      </div>
    </header>
  );
}










