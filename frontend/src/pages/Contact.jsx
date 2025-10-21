import React, { useEffect } from "react";
import ContactForm from "../components/ContactForm";
import SocialLinks from "../components/SocialLinks";

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center bg-[#0A0A0A] text-[#F2F2F2] px-6 py-16 md:py-24">
     
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#B3122D] mb-6 drop-shadow-[0_0_10px_#B3122D70] animate-ambientGlow">
        Contact & Linktree
      </h1>

     
      <p className="text-gray-300 max-w-xl mb-10 leading-relaxed">
        Une question, une collaboration ou juste un mot pour le groupe ?<br />
        Envoyez-nous un message ou suivez-nous sur nos réseaux.
      </p>

      
      <div className="w-full max-w-2xl mb-14">
        <ContactForm />
      </div>

     
      <SocialLinks />

      
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#B3122D10] to-transparent blur-3xl opacity-70 pointer-events-none"></div>
    </section>
  );
}

