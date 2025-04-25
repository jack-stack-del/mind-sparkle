
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Timer, ArrowLeft } from "lucide-react";
import GameLayout from "@/components/GameLayout";
import Reward from "@/components/Reward";

const MAX_NUMBER = 20;

const NumberOrder = () => {
  const [gameState, setGameState] = useState<"idle" | "playing" | "complete">("idle");
  const [numbers, setNumbers] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [bestTime, setBestTime] = useState(Infinity);
  const [showReward, setShowReward] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Load best time from localStorage
    const savedBestTime = localStorage.getItem("numberOrderBestTime");
    if (savedBestTime) {
      setBestTime(parseFloat(savedBestTime));
    }
  }, []);

  const startGame = () => {
    // Create array of numbers 1 to MAX_NUMBER
    const numbersArray = Array.from({ length: MAX_NUMBER }, (_, i) => i + 1);
    
    // Shuffle the numbers
    const shuffled = [...numbersArray].sort(() => Math.random() - 0.5);
    
    setNumbers(shuffled);
    setCurrentNumber(1);
    setStartTime(Date.now());
    setGameState("playing");
    setShowReward(false);
  };

  const handleNumberClick = (number: number) => {
    if (number === currentNumber) {
      if (currentNumber === MAX_NUMBER) {
        // Game complete
        const timeElapsed = (Date.now() - startTime) / 1000;
        setEndTime(timeElapsed);
        setGameState("complete");
        
        // Check if it's a new best time
        if (timeElapsed < bestTime) {
          setBestTime(timeElapsed);
          localStorage.setItem("numberOrderBestTime", timeElapsed.toString());
          setShowReward(true);
        }
      } else {
        // Move to next number
        setCurrentNumber(prev => prev + 1);
      }
    }
  };

  return (
    <GameLayout 
      title="Number Order"
      description="Tap numbers from 1 to 20 in ascending order as fast as you can"
      backLink="/games"
    >
      {gameState === "playing" && (
        <div className="mb-6">
          <div className="flex justify-between">
            <span className="font-bold">Find: {currentNumber}</span>
            <span className="text-primary font-bold">
              {((currentNumber - 1) / MAX_NUMBER * 100).toFixed(0)}% Complete
            </span>
          </div>
          <Progress 
            value={(currentNumber - 1) / MAX_NUMBER * 100} 
            className="h-2 mt-2" 
          />
        </div>
      )}
      
      <div className="bg-muted/30 rounded-lg p-4 min-h-[350px] flex flex-col justify-center">
        {gameState === "idle" && (
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Ready to test your attention?</h3>
            <p className="text-muted-foreground mb-4">Find and tap numbers from 1 to 20 in order as quickly as possible!</p>
            <Button onClick={startGame} className="mint-gradient">Start Game</Button>
          </div>
        )}
        
        {gameState === "playing" && (
          <div className="grid grid-cols-4 md:grid-cols-5 gap-4">
            {numbers.map(number => (
              <button
                key={number}
                onClick={() => handleNumberClick(number)}
                className={`h-16 w-full rounded-lg flex items-center justify-center text-xl font-bold transition-all
                  ${number === currentNumber ? 'bg-primary text-primary-foreground animate-pulse' : 
                  number < currentNumber ? 'bg-muted text-muted-foreground opacity-50' : 'bg-white shadow-sm hover:shadow-md'}
                `}
                disabled={number !== currentNumber}
              >
                {number}
              </button>
            ))}
          </div>
        )}
        
        {gameState === "complete" && (
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Well Done!</h3>
            <p className="text-lg mb-4">Your time: <span className="text-primary font-bold">{endTime.toFixed(2)} seconds</span></p>
            <p className="text-sm text-muted-foreground mb-6">Best time: {bestTime === Infinity ? "-" : bestTime.toFixed(2)} seconds</p>
            <div className="flex gap-2 justify-center">
              <Button onClick={startGame} className="mint-gradient">Play Again</Button>
              <Button onClick={() => navigate("/games")} variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Games
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {gameState !== "idle" && (
        <Card className="mt-6">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <span>Best Time</span>
              <span className="font-bold">
                {bestTime === Infinity ? "-" : `${bestTime.toFixed(2)}s`}
              </span>
            </div>
          </CardContent>
        </Card>
      )}
      
      {showReward && <Reward />}
    </GameLayout>
  );
};

export default NumberOrder;
