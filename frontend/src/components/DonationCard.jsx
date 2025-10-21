export default function DonationCard({ amount, description, onDonate }) {
  return (
    <div className="bg-[#0A0A0A] rounded-2xl border border-[#B3122D80] hover:border-[#B3122D] hover:shadow-[0_0_25px_#B3122D60] transition-all duration-300 p-6 text-center flex flex-col justify-between">
      
    
      <h3 className="text-[#B3122D] text-2xl font-bold mb-2 drop-shadow-[0_0_6px_#B3122D90]">
        {amount} €
      </h3>

      
      <p className="text-gray-400 text-sm mb-4">{description}</p>

     
      <button
        onClick={onDonate}
        className="bg-[#B3122D] text-[#F2F2F2] font-semibold py-2 px-6 rounded-full hover:bg-[#8C0E24] hover:shadow-[0_0_15px_#B3122D80] transition-all duration-300"
      >
        Soutenir
      </button>
    </div>
  );
}

