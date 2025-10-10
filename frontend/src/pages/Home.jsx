import Button from "../components/Button";

export default function Home() {
  return (
    <section className="flex flex-col items-center gap-6 py-20">
      <h1 className="text-3xl font-bold">Bienvenue sur REVEREN 🎸</h1>
      <Button variant="primary">Réserver</Button>
      <Button variant="secondary">Soutenir</Button>
    </section>
  );
}
