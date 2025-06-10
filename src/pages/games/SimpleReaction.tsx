
import { useState, useEffect, useRef } from "react";
import GameLayout from "@/components/GameLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import confetti from "canvas-confetti";

const SimpleReaction = () => {
  const [gameState, setGameState] = useState<"menu" | "waiting" | "ready" | "clicked" | "result">("menu");
  const [reactionTime, setReactionTime] = useState(0);
  const [attempts, setAttempts] = useState<number[]>([]);
  const [startTime, setStartTime] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startGame = () => {
    setGameState("waiting");
    setAttempts([]);
    
    // Random delay between 2-6 seconds
    const delay = Math.random() * 4000 + 2000;
    
    timeoutRef.current = setTimeout(() => {
      setGameState("ready");
      setStartTime(Date.now());
    }, delay);
  };

  const handleClick = () => {
    if (gameState === "waiting") {
      // Too early!
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setGameState("menu");
      alert("Too early! Wait for the green signal.");
      return;
    }
    
    if (gameState === "ready") {
      const endTime = Date.now();
      const reaction = endTime - startTime;
      setReactionTime(reaction);
      setAttempts([...attempts, reaction]);
      setGameState("clicked");
      
      if (reaction < 200) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 }
        });
      }
    }
  };

  const nextAttempt = () => {
    if (attempts.length >= 5) {
      setGameState("result");
    } else {
      setGameState("waiting");
      
      const delay = Math.random() * 4000 + 2000;
      timeoutRef.current = setTimeout(() => {
        setGameState("ready");
        setStartTime(Date.now());
      }, delay);
    }
  };

  const resetGame = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setGameState("menu");
    setAttempts([]);
  };

  const averageTime = attempts.length > 0 ? 
    Math.round(attempts.reduce((a, b) => a + b, 0) / attempts.length) : 0;

  const getPerformanceMessage = (avg: number) => {
    if (avg < 200) return "Lightning Fast! 🚀";
    if (avg < 250) return "Excellent! 👏";
    if (avg < 300) return "Good! 👍";
    if (avg < 400) return "Average 😊";
    return "Keep Practicing! 💪";
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <GameLayout
      title="Simple Reaction"
      description="Test your reaction time - click as fast as you can when the signal appears!"
      backLink="/games"
    >
      <div className="max-w-2xl mx-auto">
        {gameState === "menu" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Reaction Time Test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-muted-foreground">
                Click the button as quickly as possible when it turns green. 
                You'll do 5 attempts to measure your average reaction time.
              </p>
              <p className="text-sm text-muted-foreground">
                Don't click too early or you'll have to restart!
              </p>
              <Button onClick={startGame} className="w-full" size="lg">
                Start Test
              </Button>
            </CardContent>
          </Card>
        )}

        {gameState === "waiting" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Get Ready...</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-muted-foreground">Wait for the button to turn green!</p>
              <div
                onClick={handleClick}
                className="w-48 h-48 mx-auto bg-red-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors"
              >
                <span className="text-white font-bold text-xl">WAIT</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Attempt {attempts.length + 1} of 5
              </p>
            </CardContent>
          </Card>
        )}

        {gameState === "ready" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">CLICK NOW!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-muted-foreground">Click as fast as you can!</p>
              <div
                onClick={handleClick}
                className="w-48 h-48 mx-auto bg-green-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-600 transition-colors animate-pulse"
              >
                <span className="text-white font-bold text-xl">CLICK!</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Attempt {attempts.length + 1} of 5
              </p>
            </CardContent>
          </Card>
        )}

        {gameState === "clicked" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Nice!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <div className="text-3xl font-bold text-primary">
                {reactionTime}ms
              </div>
              <p className="text-muted-foreground">
                {reactionTime < 200 ? "Incredible!" : 
                 reactionTime < 250 ? "Excellent!" :
                 reactionTime < 300 ? "Good!" : "Keep practicing!"}
              </p>
              
              {attempts.length > 1 && (
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Previous times: {attempts.slice(0, -1).join('ms, ')}ms
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Current average: {averageTime}ms
                  </p>
                </div>
              )}
              
              <Button onClick={nextAttempt} className="w-full">
                {attempts.length >= 5 ? "See Results" : "Next Attempt"}
              </Button>
            </CardContent>
          </Card>
        )}

        {gameState === "result" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Final Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">{averageTime}ms</div>
                <p className="text-xl font-semibold">{getPerformanceMessage(averageTime)}</p>
              </div>
              
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p className="text-sm font-medium">All Attempts:</p>
                <div className="grid grid-cols-5 gap-2">
                  {attempts.map((time, index) => (
                    <div key={index} className="bg-white p-2 rounded text-sm">
                      {time}ms
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Best: {Math.min(...attempts)}ms | Worst: {Math.max(...attempts)}ms
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Average human reaction time is 200-300ms. Regular practice can improve your speed!
                </p>
              </div>
              
              <Button onClick={resetGame} className="w-full">
                Test Again
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </GameLayout>
  );
};

export default SimpleReaction;
