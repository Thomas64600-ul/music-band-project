import React, { useState } from "react";
import Button from "./Button";
import { post } from "../lib/api";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  function onChange(e) {
    setForm((f) => ({ ...f, [e.target.id]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      await post("/messages", form); 
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="bg-[#0B0F17] border border-[#FFD70040] rounded-2xl shadow-lg p-6 md:p-10 w-full max-w-2xl mx-auto space-y-6">
      <div>
        <label htmlFor="name" className="block text-[#FFD700] mb-2 font-semibold">Nom</label>
        <input id="name" value={form.name} onChange={onChange} type="text" placeholder="Votre nom" className="w-full p-3 rounded-md bg-[#111] text-[#F2F2F2] border border-gray-700 focus:border-[#FFD700] outline-none" required />
      </div>
      <div>
        <label htmlFor="email" className="block text-[#FFD700] mb-2 font-semibold">Email</label>
        <input id="email" value={form.email} onChange={onChange} type="email" placeholder="vous@exemple.com" className="w-full p-3 rounded-md bg-[#111] text-[#F2F2F2] border border-gray-700 focus:border-[#FFD700] outline-none" required />
      </div>
      <div>
        <label htmlFor="message" className="block text-[#FFD700] mb-2 font-semibold">Message</label>
        <textarea id="message" value={form.message} onChange={onChange} rows="5" placeholder="Votre message..." className="w-full p-3 rounded-md bg-[#111] text-[#F2F2F2] border border-gray-700 focus:border-[#FFD700] outline-none" required />
      </div>
      <div className="text-center">
        <Button variant="primary" type="submit" disabled={status==="loading"}>
          {status==="loading" ? "Envoi..." : "Envoyer"}
        </Button>
        {status==="success" && <p className="mt-3 text-green-400">Message envoyé</p>}
        {status==="error" && <p className="mt-3 text-red-400">Échec de l’envoi</p>}
      </div>
    </form>
  );
}

