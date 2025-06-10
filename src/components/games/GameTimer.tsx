
import { Timer } from "lucide-react";

interface GameTimerProps {
  timeElapsed: number;
  moves: number;
}

const GameTimer = ({ timeElapsed, moves }: GameTimerProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="mb-6 flex justify-between">
      <div className="flex items-center gap-2">
        <Timer className="h-5 w-5 text-primary" />
        <span className="font-bold">{formatTime(timeElapsed)}</span>
      </div>
      <div className="font-bold">
        Moves: {moves}
      </div>
    </div>
  );
};

export default GameTimer;
