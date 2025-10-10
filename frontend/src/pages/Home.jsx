import Player from "../components/Player";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center text-center py-20 gap-6 bg-[#0A0A0A] text-[#F2F2F2]">
      <h1 className="text-3xl font-bold">Bienvenue sur REVEREN 🎸</h1>
      <p>Le son du rock électro commence ici.</p>

      <div className="mt-8">
        <Player
          src="/music/test.mp3"
          title="Electric Sunrise"
          artist="REVEREN"
          cover="/src/assets/cover.jpg"
        />
      </div>
    </main>
  );
}

