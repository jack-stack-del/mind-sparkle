
import { Button } from "@/components/ui/button";

interface GameStartScreenProps {
  onStartGame: () => void;
}

const GameStartScreen = ({ onStartGame }: GameStartScreenProps) => {
  return (
    <div className="text-center">
      <h3 className="text-xl font-bold mb-2">Memory Challenge</h3>
      <p className="text-muted-foreground mb-4">Find matching pairs of cards in as few moves as possible</p>
      <Button onClick={onStartGame} className="mint-gradient">Start Game</Button>
    </div>
  );
};

export default GameStartScreen;
