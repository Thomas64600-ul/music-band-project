export default function DonationCard({ amount, description, onDonate }) {
  return (
    <div className="bg-[#0B0F17] rounded-2xl border border-gray-800 hover:border-[#FFD700] hover:shadow-[0_0_25px_#FFD70040] transition-all duration-300 p-6 text-center flex flex-col justify-between">
      <h3 className="text-[#FFD700] text-2xl font-bold mb-2">{amount} €</h3>
      <p className="text-gray-300 text-sm mb-4">{description}</p>
      <button
        onClick={onDonate}
        className="bg-[#FFD700] text-black font-semibold py-2 px-6 rounded-full hover:bg-black hover:text-[#FFD700] transition-all duration-300"
      >
        Soutenir
      </button>
    </div>
  );
}
