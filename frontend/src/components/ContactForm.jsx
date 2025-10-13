// src/components/ContactForm.jsx
import React from "react";
import Button from "./Button";

export default function ContactForm() {
  return (
    <form className="bg-[#0B0F17] border border-[#FFD70040] rounded-2xl shadow-lg p-6 md:p-10 w-full max-w-2xl mx-auto space-y-6">
      <div>
        <label htmlFor="name" className="block text-[#FFD700] mb-2 font-semibold">
          Nom
        </label>
        <input
          id="name"
          type="text"
          placeholder="Votre nom"
          className="w-full p-3 rounded-md bg-[#111] text-[#F2F2F2] border border-gray-700 focus:border-[#FFD700] outline-none"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-[#FFD700] mb-2 font-semibold">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="votre@email.com"
          className="w-full p-3 rounded-md bg-[#111] text-[#F2F2F2] border border-gray-700 focus:border-[#FFD700] outline-none"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-[#FFD700] mb-2 font-semibold">
          Message
        </label>
        <textarea
          id="message"
          rows="5"
          placeholder="Votre message..."
          className="w-full p-3 rounded-md bg-[#111] text-[#F2F2F2] border border-gray-700 focus:border-[#FFD700] outline-none"
        ></textarea>
      </div>

      <div className="text-center">
        <Button variant="primary">Envoyer</Button>
      </div>
    </form>
  );
}
