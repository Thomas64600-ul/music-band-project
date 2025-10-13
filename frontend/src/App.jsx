// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Music from "./pages/Music";
import Concerts from "./pages/Concerts";
import Articles from "./pages/Blog";
import Contact from "./pages/Contact";
import Cagnotte from "./pages/Cagnotte"; // ✅ Import de la page Cagnotte


export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-[#F2F2F2]">
      {/* ✅ Header toujours visible */}
      <Header
        logoSrc="/src/assets/logo.png"
        links={[
          { name: "Accueil", path: "/" },
          { name: "Musique", path: "/music" },
          { name: "Concerts", path: "/concerts" },
          { name: "Blog", path: "/blog" },
          { name: "Cagnotte", path: "/cagnotte" }, // ✅ lien ajouté dans le menu
          { name: "Contact", path: "/contact" },
        ]}
      />

      {/* ✅ Contenu principal */}
      <main className="flex-grow pt-20 md:pt-28 pb-16 md:pb-18">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/music" element={<Music />} />
          <Route path="/blog" element={<Articles />} />
          <Route path="/concerts" element={<Concerts />} />
          <Route path="/cagnotte" element={<Cagnotte />} /> {/* ✅ Nouvelle route */}
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

    
      <Footer
        siteTitle="REVEREN"
        socials={[
          { name: "Instagram", url: "https://instagram.com", Icon: undefined },
          { name: "YouTube", url: "https://youtube.com", Icon: undefined },
          { name: "Spotify", url: "https://spotify.com", Icon: undefined },
        ]}
      />
    </div>
  );
}












