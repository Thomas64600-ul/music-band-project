export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-yellow-400 dark:bg-yellow-100 dark:text-gray-900 transition-all duration-500">
      <h1 className="text-4xl font-bold mb-4">✅ Tailwind fonctionne !</h1>
      <p className="text-lg">Essaie d’activer le mode sombre ci-dessous.</p>

      {/* Simulation du mode sombre */}
      <button
        onClick={() => document.body.classList.toggle('dark')}
        className="mt-6 bg-yellow-400 text-gray-900 px-4 py-2 rounded hover:bg-yellow-500 dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700"
      >
        Basculer clair / sombre
      </button>
    </div>
  );
}





