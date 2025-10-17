export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#FFD700]"></div>
      <p className="mt-4 text-[#FFD700] font-medium">Chargement…</p>
    </div>
  );
}
