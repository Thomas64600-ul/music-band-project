
import React, { useEffect } from "react";
import ContactForm from "../components/ContactForm";
import SocialLinks from "../components/SocialLinks";

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center bg-[#0A0A0A] text-[#F2F2F2] px-6 py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#FFD700] mb-6 drop-shadow-[0_0_10px_#FFD70060]">
        Contact & Linktree
      </h1>
      <p className="text-gray-300 max-w-xl mb-10">
        Une question, une collaboration ou juste un mot pour le groupe ?
        Envoyez-nous un message ou suivez-nous sur les réseaux.
      </p>

      <ContactForm />
      <SocialLinks />
    </section>
  );
}
