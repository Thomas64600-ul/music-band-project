import React, { useEffect } from "react";
import ContactForm from "../components/ContactForm";
import SocialLinks from "../components/SocialLinks";

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center bg-[#0A0A0A] text-[#F2F2F2] px-6 py-16 md:py-24">
     
       <div className="relative inline-block mb-12 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B3122D40] to-transparent blur-md"></div>
        <h1 className="relative text-4xl md:text-5xl font-extrabold text-[#B3122D] drop-shadow-[0_0_12px_#B3122D80] tracking-wide">
         Contact & Linktree
        </h1>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-40 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent animate-glow-line"></div>
      </div>

     
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

