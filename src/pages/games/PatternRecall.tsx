
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import GameLayout from "@/components/GameLayout";
import Reward from "@/components/Reward";

const PatternRecall = () => {
  const [gameState, setGameState] = useState<"idle" | "watching" | "repeating" | "complete">("idle");
  const [level, setLevel] = useState(1);
  const [pattern, setPattern] = useState<string[]>([]);
  const [userPattern, setUserPattern] = useState<string[]>([]);
  const [highestLevel, setHighestLevel] = useState(0);
  const [showReward, setShowReward] = useState(false);
  
  const colors = ["red", "blue", "green", "yellow"];
  const sequenceRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    // Load highest level from localStorage
    const savedHighestLevel = localStorage.getItem("patternRecallHighestLevel");
    if (savedHighestLevel) {
      setHighestLevel(parseInt(savedHighestLevel, 10));
    }
    
    return () => {
      if (sequenceRef.current) clearTimeout(sequenceRef.current);
    };
  }, []);

  const startGame = () => {
    setLevel(1);
    generatePattern(1);
    setShowReward(false);
  };

  const generatePattern = (currentLevel: number) => {
    const newPattern = [];
    for (let i = 0; i < currentLevel + 2; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      newPattern.push(randomColor);
    }
    
    setPattern(newPattern);
    setUserPattern([]);
    
    // Start showing the pattern
    setGameState("watching");
    showSequence(newPattern);
  };

  const showSequence = (sequence: string[]) => {
    let i = 0;
    const intervalTime = 1000 - (level * 50); // Speed up as levels increase
    
    const showNext = () => {
      if (i >= sequence.length) {
        setGameState("repeating");
        return;
      }
      
      // Highlight the color
      const colorEl = document.getElementById(`color-${sequence[i]}`);
      if (colorEl) {
        colorEl.classList.add("ring-4", "ring-white", "scale-105");
        
        // Remove highlight after 500ms
        setTimeout(() => {
          colorEl.classList.remove("ring-4", "ring-white", "scale-105");
          i++;
          sequenceRef.current = setTimeout(showNext, intervalTime / 2);
        }, intervalTime / 2);
      }
    };
    
    showNext();
  };

  const handleColorClick = (color: string) => {
    if (gameState !== "repeating") return;
    
    const newUserPattern = [...userPattern, color];
    setUserPattern(newUserPattern);
    
    // Check if the user's selection matches the pattern so far
    for (let i = 0; i < newUserPattern.length; i++) {
      if (newUserPattern[i] !== pattern[i]) {
        // Pattern mismatch - game over
        setGameState("complete");
        return;
      }
    }
    
    // Check if the pattern is complete
    if (newUserPattern.length === pattern.length) {
      // Level complete
      const nextLevel = level + 1;
      setLevel(nextLevel);
      
      // Check if it's a new highest level
      if (nextLevel > highestLevel) {
        setHighestLevel(nextLevel);
        localStorage.setItem("patternRecallHighestLevel", nextLevel.toString());
        setShowReward(true);
      }
      
      // Short delay before next level
      setTimeout(() => {
        generatePattern(nextLevel);
      }, 1000);
    }
  };

  const getColorStyle = (color: string) => {
    switch(color) {
      case "red":
        return "bg-red-400 hover:bg-red-500";
      case "blue":
        return "bg-blue-400 hover:bg-blue-500";
      case "green":
        return "bg-green-400 hover:bg-green-500";
      case "yellow":
        return "bg-yellow-400 hover:bg-yellow-500";
      default:
        return "";
    }
  };

  return (
    <GameLayout 
      title="Pattern Recall"
      description="Remember and repeat color sequences to test your memory"
      backLink="/games"
    >
      <div className="mb-6 text-center">
        {gameState === "watching" && <div className="text-lg font-bold">Watch the pattern...</div>}
        {gameState === "repeating" && <div className="text-lg font-bold">Now repeat the pattern!</div>}
        {(gameState === "watching" || gameState === "repeating" || gameState === "complete") && (
          <div className="text-sm text-muted-foreground mt-1">Level: {level}</div>
        )}
      </div>
      
      <div className="bg-muted/30 rounded-lg p-6 min-h-[350px] flex flex-col items-center justify-center">
        {gameState === "idle" && (
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Test Your Memory</h3>
            <p className="text-muted-foreground mb-4">Watch the pattern of colors and then repeat it</p>
            <Button onClick={startGame} className="mint-gradient">Start Game</Button>
          </div>
        )}
        
        {(gameState === "watching" || gameState === "repeating" || gameState === "complete") && (
          <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
            {colors.map(color => (
              <button
                key={color}
                id={`color-${color}`}
                onClick={() => handleColorClick(color)}
                disabled={gameState !== "repeating"}
                className={`h-32 w-full rounded-lg transition-all ${getColorStyle(color)}`}
              />
            ))}
          </div>
        )}
        
        {gameState === "complete" && (
          <div className="text-center mt-8">
            <h3 className="text-xl font-bold mb-2">Game Over!</h3>
            <p className="mb-4">You reached Level {level}</p>
            <Button onClick={startGame} className="mint-gradient">Play Again</Button>
          </div>
        )}
      </div>
      
      {gameState !== "idle" && (
        <Card className="mt-6">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <span>Highest Level</span>
              <span className="font-bold">{highestLevel}</span>
            </div>
          </CardContent>
        </Card>
      )}
      
      {showReward && <Reward />}
    </GameLayout>
  );
};

export default PatternRecall;
