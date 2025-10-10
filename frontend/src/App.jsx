// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import TestButtons from "./pages/TestButtons";
import TestPlayer from "./pages/TestPlayer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-[#F2F2F2]">
      <Header
        logoSrc="/src/assets/logo.png"
        links={[
          { name: "Accueil", path: "/" },
          { name: "Musique", path: "/music" },
          { name: "Concerts", path: "/concerts" },
          { name: "Blog", path: "/blog" },
          { name: "Cagnotte", path: "/cagnotte" },
          { name: "Contact", path: "/contact" },
        ]}
      />

     
      <main className="flex-grow pt-20 md:pt-28 pb-16 md:pb-18">
        <Routes>
          <Route path="/" element={<Home />} />
           <Route path="/test-buttons" element={<TestButtons />} />
           <Route path="/test-player" element={<TestPlayer />} />
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











