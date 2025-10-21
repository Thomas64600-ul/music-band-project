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
    <form
      onSubmit={onSubmit}
      className="bg-[#0A0A0A] border border-[#B3122D80] rounded-2xl shadow-[0_0_25px_#B3122D40] p-6 md:p-10 w-full max-w-2xl mx-auto space-y-6 transition-all duration-300 hover:shadow-[0_0_35px_#B3122D60]"
    >
      
      <div>
        <label
          htmlFor="name"
          className="block text-[#B3122D] mb-2 font-semibold tracking-wide"
        >
          Nom
        </label>
        <input
          id="name"
          value={form.name}
          onChange={onChange}
          type="text"
          placeholder="Votre nom"
          className="w-full p-3 rounded-md bg-[#111] text-[#F2F2F2] border border-[#2C2C2C] focus:border-[#B3122D] outline-none transition-all duration-200"
          required
        />
      </div>

      
      <div>
        <label
          htmlFor="email"
          className="block text-[#B3122D] mb-2 font-semibold tracking-wide"
        >
          Email
        </label>
        <input
          id="email"
          value={form.email}
          onChange={onChange}
          type="email"
          placeholder="vous@exemple.com"
          className="w-full p-3 rounded-md bg-[#111] text-[#F2F2F2] border border-[#2C2C2C] focus:border-[#B3122D] outline-none transition-all duration-200"
          required
        />
      </div>

      
      <div>
        <label
          htmlFor="message"
          className="block text-[#B3122D] mb-2 font-semibold tracking-wide"
        >
          Message
        </label>
        <textarea
          id="message"
          value={form.message}
          onChange={onChange}
          rows="5"
          placeholder="Votre message..."
          className="w-full p-3 rounded-md bg-[#111] text-[#F2F2F2] border border-[#2C2C2C] focus:border-[#B3122D] outline-none transition-all duration-200"
          required
        />
      </div>

      
      <div className="text-center">
        <Button
          variant="primary"
          type="submit"
          disabled={status === 'loading'}
          className="bg-[#B3122D] text-[#F2F2F2] font-semibold py-2 px-8 rounded-full hover:bg-[#8C0E24] hover:shadow-[0_0_15px_#B3122D80] transition-all duration-300 disabled:opacity-60"
        >
          {status === "loading" ? "Envoi..." : "Envoyer"}
        </Button>

        {status === "success" && (
          <p className="mt-3 text-[#00E676] font-medium">
            Message envoyé !
          </p>
        )}
        {status === "error" && (
          <p className="mt-3 text-[#FF4C4C] font-medium">
            Échec de l’envoi, réessayez.
          </p>
        )}
      </div>
    </form>
  );
}


