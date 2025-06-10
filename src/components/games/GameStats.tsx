
import { Card, CardContent } from "@/components/ui/card";

interface GameStatsProps {
  bestTime: number;
  bestMoves: number;
}

const GameStats = ({ bestTime, bestMoves }: GameStatsProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <Card className="mt-6">
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Best Time</div>
            <div className="font-bold">
              {bestTime === Infinity ? "-" : formatTime(bestTime)}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Best Moves</div>
            <div className="font-bold">
              {bestMoves === Infinity ? "-" : bestMoves}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameStats;
