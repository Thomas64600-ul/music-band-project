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
      className="
        bg-[var(--surface)]
        border border-[var(--border)]
        rounded-2xl shadow-[0_0_25px_var(--accent)]
        p-6 md:p-10 w-full max-w-2xl mx-auto space-y-6
        transition-all duration-300
        hover:shadow-[0_0_35px_var(--accent)]
        hover:border-[var(--accent)]
      "
    >
      
      <div>
        <label
          htmlFor="name"
          className="block text-[var(--accent)] mb-2 font-semibold tracking-wide"
        >
          Nom
        </label>
        <input
          id="name"
          value={form.name}
          onChange={onChange}
          type="text"
          placeholder="Votre nom"
          className="
            w-full p-3 rounded-md 
            bg-[color-mix(in_oklab,var(--surface)_90%,black_10%)]
            text-[var(--text)]
            border border-[var(--border)]
            focus:border-[var(--accent)]
            outline-none transition-all duration-200
          "
          required
        />
      </div>

      
      <div>
        <label
          htmlFor="email"
          className="block text-[var(--accent)] mb-2 font-semibold tracking-wide"
        >
          Email
        </label>
        <input
          id="email"
          value={form.email}
          onChange={onChange}
          type="email"
          placeholder="vous@exemple.com"
          className="
            w-full p-3 rounded-md 
            bg-[color-mix(in_oklab,var(--surface)_90%,black_10%)]
            text-[var(--text)]
            border border-[var(--border)]
            focus:border-[var(--accent)]
            outline-none transition-all duration-200
          "
          required
        />
      </div>

      
      <div>
        <label
          htmlFor="message"
          className="block text-[var(--accent)] mb-2 font-semibold tracking-wide"
        >
          Message
        </label>
        <textarea
          id="message"
          value={form.message}
          onChange={onChange}
          rows="5"
          placeholder="Votre message..."
          className="
            w-full p-3 rounded-md 
            bg-[color-mix(in_oklab,var(--surface)_90%,black_10%)]
            text-[var(--text)]
            border border-[var(--border)]
            focus:border-[var(--accent)]
            outline-none transition-all duration-200
          "
          required
        />
      </div>

     
      <div className="text-center">
        <Button
          variant="primary"
          type="submit"
          disabled={status === "loading"}
          className="
            font-semibold py-2 px-8 rounded-full 
            bg-[var(--accent)] text-[var(--bg)]
            hover:bg-[color-mix(in_oklab,var(--accent)_85%,var(--gold)_15%)]
            hover:shadow-[0_0_18px_var(--accent)]
            disabled:opacity-60
            transition-all duration-300
          "
        >
          {status === "loading" ? "Envoi..." : "Envoyer"}
        </Button>

        {status === "success" && (
          <p className="mt-3 text-[var(--cyan)] font-medium animate-pulse">
            Message envoyé avec succès 🎉
          </p>
        )}
        {status === "error" && (
          <p className="mt-3 text-[color-mix(in_oklab,red_80%,var(--accent)_20%)] font-medium animate-pulse">
            Échec de l’envoi. Réessayez.
          </p>
        )}
      </div>
    </form>
  );
}


