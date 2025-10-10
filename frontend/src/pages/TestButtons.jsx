
import Button from "../components/Button";
import { FaArrowRight, FaHeart } from "react-icons/fa";

export default function TestButtons() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F2F2F2] flex items-center justify-center p-6">
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Button variant="primary" iconRight={<FaArrowRight />}>
          Réserver
        </Button>

        <Button variant="secondary" iconLeft={<FaHeart />}>
          Soutenir
        </Button>

        <Button variant="outline" fullWidth>
          En savoir plus
        </Button>

        <Button variant="primary" size="sm">
          Petit bouton
        </Button>

        <Button variant="primary" size="lg" disabled>
          Désactivé
        </Button>
      </div>
    </div>
  );
}
