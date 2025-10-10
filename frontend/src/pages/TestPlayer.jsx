import Player from "../components/Player";

export default function TestPlayer() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <Player
        src="/music/test.mp3"
        title="Electric Sunrise"
        artist="REVEREN"
        cover="/src/assets/cover.jpg"
        autoplay={false}
      />
    </div>
  );
}