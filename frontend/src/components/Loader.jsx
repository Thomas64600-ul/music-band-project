export default function Loader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center py-20 text-center"
    >
     
      <div
        className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#FFD700]"
        aria-hidden="true"
      ></div>

      <p className="mt-4 text-[#FFD700] font-medium">Chargement…</p>

      <span className="sr-only">Chargement du contenu en cours</span>
    </div>
  );
}
