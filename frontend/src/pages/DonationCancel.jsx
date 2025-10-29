export default function DonationCancel() {
  return (
    <main
      className="
        min-h-screen flex flex-col justify-center items-center text-center
        bg-[#0A0A0A] text-[#F2F2F2]
        transition-colors duration-700 ease-in-out
      "
      role="main"
    >
      <h1
        className="
          text-3xl md:text-4xl font-extrabold text-[#B3122D]
          mb-4 drop-shadow-[0_0_10px_#B3122D55]
        "
      >
        Paiement annulé
      </h1>

      <p className="text-gray-400 max-w-md leading-relaxed">
        Pas grave — revenez quand vous voudrez soutenir{" "}
        <span className="text-[#FFD700] font-semibold">REVEREN</span> 🎶
      </p>
    </main>
  );
}
