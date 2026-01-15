import { useEffect, useState } from "react";

const STORAGE_KEY = "reveren.cookies.notice.v1";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(STORAGE_KEY);
    if (!accepted) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner is-visible" role="dialog" aria-live="polite">
      <div className="cookie-banner__content">
        <p className="cookie-banner__text">
          REVEREN utilise uniquement des cookies nécessaires au bon fonctionnement du site.
          Aucun cookie de suivi ou publicitaire n’est utilisé.{" "}
          <a className="cookie-banner__link" href="/privacy">
            En savoir plus
          </a>
        </p>

        <button className="cookie-banner__btn" onClick={accept}>
          OK, j’ai compris
        </button>
      </div>
    </div>
  );
}
