
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Award, Timer, ArrowLeft } from "lucide-react";
import GameLayout from "@/components/GameLayout";
import Reward from "@/components/Reward";

const GAME_DURATION = 30; // seconds
const TARGET_APPEARANCES = 20; // number of targets to show

const SpeedTap = () => {
  const [gameState, setGameState] = useState<"idle" | "playing" | "complete">("idle");
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [targetVisible, setTargetVisible] = useState(false);
  const [targetPosition, setTargetPosition] = useState({ top: 0, left: 0 });
  const [targetsShown, setTargetsShown] = useState(0);
  const [showReward, setShowReward] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const targetRef = useRef<NodeJS.Timeout | null>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Load high score from localStorage
    const savedHighScore = localStorage.getItem("speedTapHighScore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (targetRef.current) clearTimeout(targetRef.current);
    };
  }, []);

  const startGame = () => {
    setGameState("playing");
    setTimeLeft(GAME_DURATION);
    setScore(0);
    setTargetsShown(0);
    setShowReward(false);

    // Start the game timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Show first target
    showNewTarget();
  };

  const endGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (targetRef.current) clearTimeout(targetRef.current);
    
    setTargetVisible(false);
    setGameState("complete");
    
    // Check if it's a new high score
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("speedTapHighScore", score.toString());
      setShowReward(true);
    }
  };

  const showNewTarget = () => {
    if (gameState !== "playing" || targetsShown >= TARGET_APPEARANCES) {
      endGame();
      return;
    }

    setTargetVisible(false);
    
    // Random delay before showing next target (0.5 to 2 seconds)
    const delay = Math.random() * 1500 + 500;
    
    targetRef.current = setTimeout(() => {
      if (gameAreaRef.current) {
        const maxWidth = gameAreaRef.current.clientWidth - 80;
        const maxHeight = gameAreaRef.current.clientHeight - 80;
        
        setTargetPosition({
          top: Math.floor(Math.random() * maxHeight),
          left: Math.floor(Math.random() * maxWidth)
        });
        
        setTargetVisible(true);
        setTargetsShown(prev => prev + 1);
      }
    }, delay);
  };

  const handleTargetClick = () => {
    setScore(prev => prev + 1);
    showNewTarget();
  };

  return (
    <GameLayout 
      title="Speed Tap"
      description="Test your reaction speed by tapping targets as they appear"
      backLink="/games"
    >
      <div className="mb-6 flex justify-between">
        <div className="flex items-center gap-2 text-primary">
          <Timer className="h-5 w-5" />
          <span className="font-bold">{timeLeft}s</span>
        </div>
        <div className="flex items-center gap-2 text-accent">
          <Award className="h-5 w-5" />
          <span className="font-bold">Score: {score}</span>
        </div>
      </div>
      
      <div 
        ref={gameAreaRef} 
        className="relative bg-muted/30 rounded-lg w-full h-[400px] overflow-hidden mb-4"
      >
        {gameState === "idle" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold mb-2">Ready to test your reflexes?</h3>
            <p className="text-muted-foreground mb-4">Tap the circles as quickly as you can!</p>
            <Button onClick={startGame} className="mint-gradient">Start Game</Button>
          </div>
        )}
        
        {gameState === "playing" && targetVisible && (
          <div
            className="absolute w-16 h-16 bg-primary rounded-full cursor-pointer animate-pulse"
            style={{ top: `${targetPosition.top}px`, left: `${targetPosition.left}px` }}
            onClick={handleTargetClick}
          />
        )}
        
        {gameState === "complete" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold mb-2">Game Over!</h3>
            <p className="text-muted-foreground mb-2">Your score: {score}/{TARGET_APPEARANCES}</p>
            <p className="text-muted-foreground mb-4">High score: {highScore}/{TARGET_APPEARANCES}</p>
            <div className="flex gap-2">
              <Button onClick={startGame} className="mint-gradient">Play Again</Button>
              <Button onClick={() => navigate("/games")} variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Games
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-2">
            <span>Your Best</span>
            <span className="font-bold">{highScore}/{TARGET_APPEARANCES}</span>
          </div>
          <Progress value={(highScore / TARGET_APPEARANCES) * 100} className="h-2" />
        </CardContent>
      </Card>
      
      {showReward && <Reward />}
    </GameLayout>
  );
};

export default SpeedTap;
