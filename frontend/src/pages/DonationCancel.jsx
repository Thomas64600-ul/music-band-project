import { Link } from "react-router-dom";

export default function DonationCancel() {
  return (
    <section
      className="
        px-6 sm:px-12 py-24 md:py-28 
        text-center relative overflow-hidden
        bg-[#F8F8F8] text-[#1A1A1A]
        dark:bg-[#0A0A0A] dark:text-[#F2F2F2]
        transition-colors duration-700
      "
    >
      <div
        className="
          max-w-xl mx-auto
          bg-white dark:bg-[#111]
          border border-gray-200 dark:border-[#B3122D]/60
          rounded-2xl p-8
          shadow-[0_0_20px_rgba(0,0,0,0.06)]
          dark:shadow-[0_0_25px_#B3122D40]
        "
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#B3122D]">
          Paiement annulé
        </h1>

        <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          Aucun souci : le paiement a été annulé et aucun montant n’a été
          prélevé. Vous pouvez réessayer quand vous voulez.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/cagnotte"
            className="
              bg-[#B3122D] hover:bg-[#A01025]
              text-white font-semibold py-2 px-6 rounded-full
              transition-all duration-300
              hover:shadow-[0_0_25px_#B3122D88]
            "
          >
            Retour à la cagnotte
          </Link>

          <Link
            to="/"
            className="
              border border-gray-300 dark:border-gray-700
              text-gray-700 dark:text-gray-200
              font-semibold py-2 px-6 rounded-full
              hover:border-[#B3122D] hover:text-[#B3122D]
              transition-all duration-300
            "
          >
            Revenir à l’accueil
          </Link>
        </div>
      </div>
    </section>
  );
}


