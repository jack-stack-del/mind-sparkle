
import { Button } from "@/components/ui/button";

interface GameResultsProps {
  timeElapsed: number;
  moves: number;
  onPlayAgain: () => void;
}

const GameResults = ({ timeElapsed, moves, onPlayAgain }: GameResultsProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="text-center">
      <h3 className="text-xl font-bold mb-2">Well Done!</h3>
      <p className="mb-1">Time: {formatTime(timeElapsed)}</p>
      <p className="mb-4">Moves: {moves}</p>
      <Button onClick={onPlayAgain} className="mint-gradient">Play Again</Button>
    </div>
  );
};

export default GameResults;
