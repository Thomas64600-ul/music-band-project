import { Link, useSearchParams } from "react-router-dom";

export default function DonationSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <main
      className="
        min-h-screen flex flex-col justify-center items-center text-center
        bg-[#0A0A0A] text-[#F2F2F2]
        transition-colors duration-700 ease-in-out
        px-4
      "
      role="main"
    >
      <h1
        className="
          text-3xl md:text-4xl font-extrabold text-[#B3122D]
          mb-4 drop-shadow-[0_0_10px_#B3122D55]
        "
      >
        Merci pour votre soutien 🤘
      </h1>

      <p className="text-gray-400 max-w-md leading-relaxed mb-6">
        Votre don aide{" "}
        <span className="text-[#FFD700] font-semibold">REVEREN</span> à créer
        encore plus de musique et à partager sa passion avec le monde 🎶
      </p>

      {sessionId && (
        <p className="text-xs text-gray-500 mb-6">
          Référence : <span className="font-mono">{sessionId}</span>
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/cagnotte"
          className="
            px-6 py-3 bg-[#B3122D] text-white rounded-lg font-semibold
            hover:bg-[#8E0F24] hover:shadow-[0_0_20px_#B3122D80]
            focus:outline-none focus:ring-2 focus:ring-[#FFD700]/60
            active:scale-95
            transition-all duration-300 ease-in-out
          "
        >
          Retour à la cagnotte
        </Link>

        <Link
          to="/"
          className="
            px-6 py-3 border border-[#FFD700] text-[#FFD700] rounded-lg font-semibold
            hover:bg-[#FFD700]/10 hover:shadow-[0_0_20px_#FFD70050]
            focus:outline-none focus:ring-2 focus:ring-[#FFD700]/60
            active:scale-95
            transition-all duration-300 ease-in-out
          "
        >
          Retour à l’accueil
        </Link>
      </div>
    </main>
  );
}
