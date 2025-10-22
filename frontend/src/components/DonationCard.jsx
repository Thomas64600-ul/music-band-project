export default function DonationCard({ amount, description, onDonate }) {
  return (
    <div
      className="
        bg-[var(--surface)]
        border border-[var(--border)]
        rounded-2xl p-6 text-center flex flex-col justify-between
        transition-all duration-300
        hover:border-[var(--accent)]
        hover:shadow-[0_0_25px_var(--accent)]
        hover:scale-[1.02]
      "
    >
     
      <h3 className="text-[var(--accent)] text-2xl font-bold mb-2 drop-shadow-[0_0_6px_var(--accent)]">
        {amount} €
      </h3>

     
      <p className="text-[var(--subtext)] text-sm mb-4 leading-relaxed">
        {description}
      </p>

      
      <button
        onClick={onDonate}
        className="
          bg-[var(--accent)]
          text-[var(--bg)]
          font-semibold py-2 px-6 rounded-full
          hover:bg-[color-mix(in_oklab,var(--accent)_85%,var(--gold)_15%)]
          hover:shadow-[0_0_18px_var(--accent)]
          active:bg-[color-mix(in_oklab,var(--accent)_70%,black_20%)]
          transition-all duration-300
          hover:animate-neonPulse
        "
      >
        Soutenir
      </button>
    </div>
  );
}


