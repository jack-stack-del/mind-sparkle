
import { useState, useEffect } from "react";
import GameLayout from "@/components/GameLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import confetti from "canvas-confetti";

const ColorStroop = () => {
  const [gameState, setGameState] = useState<"menu" | "playing" | "result">("menu");
  const [currentWord, setCurrentWord] = useState("");
  const [currentColor, setCurrentColor] = useState("");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [totalRounds] = useState(20);
  const [timeLeft, setTimeLeft] = useState(30);
  const [startTime, setStartTime] = useState(0);

  const colors = [
    { name: "red", class: "text-red-500" },
    { name: "blue", class: "text-blue-500" },
    { name: "green", class: "text-green-500" },
    { name: "yellow", class: "text-yellow-500" },
    { name: "purple", class: "text-purple-500" }
  ];

  const generateStroopWord = () => {
    const wordColor = colors[Math.floor(Math.random() * colors.length)];
    const textColor = colors[Math.floor(Math.random() * colors.length)];
    
    setCurrentWord(wordColor.name);
    setCurrentColor(textColor.class);
    return textColor.name;
  };

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setRound(0);
    setTimeLeft(30);
    setStartTime(Date.now());
    generateStroopWord();
  };

  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameState === "playing" && timeLeft === 0) {
      endGame();
    }
  }, [gameState, timeLeft]);

  const handleAnswer = (selectedColor: string) => {
    const correctColor = currentColor.split('-')[1]; // Extract color from class name
    
    if (selectedColor === correctColor) {
      setScore(score + 10);
      if (score > 0 && score % 100 === 0) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 }
        });
      }
    }
    
    setRound(round + 1);
    
    if (round + 1 >= totalRounds) {
      endGame();
    } else {
      generateStroopWord();
    }
  };

  const endGame = () => {
    setGameState("result");
    if (score >= 150) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const resetGame = () => {
    setGameState("menu");
  };

  return (
    <GameLayout
      title="Color Stroop"
      description="Identify the color of the text, not what the word says. Classic cognitive training!"
      backLink="/games"
    >
      <div className="max-w-2xl mx-auto">
        {gameState === "menu" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Color Stroop Test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-muted-foreground">
                You'll see color words displayed in different colors. Click the color of the text, 
                NOT what the word says!
              </p>
              <p className="text-sm text-muted-foreground">
                You have 30 seconds to get as many correct as possible.
              </p>
              <Button onClick={startGame} className="w-full">
                Start Game
              </Button>
            </CardContent>
          </Card>
        )}

        {gameState === "playing" && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  Round: {round + 1}/{totalRounds}
                </div>
                <div className="text-sm">
                  Score: {score}
                </div>
                <div className="text-sm">
                  Time: {timeLeft}s
                </div>
              </div>
              <Progress value={(timeLeft / 30) * 100} className="mt-2" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  What COLOR is this text?
                </p>
                <div className={`text-6xl font-bold ${currentColor}`}>
                  {currentWord.toUpperCase()}
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {colors.map((color) => (
                  <Button
                    key={color.name}
                    onClick={() => handleAnswer(color.name)}
                    className={`h-16 ${color.class} bg-white border-2 hover:bg-gray-50`}
                    variant="outline"
                  >
                    {color.name.toUpperCase()}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {gameState === "result" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                {score >= 150 ? "Excellent!" : score >= 100 ? "Good Job!" : "Keep Practicing!"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <div className="space-y-2">
                <p className="text-2xl font-bold">Final Score: {score}</p>
                <p className="text-muted-foreground">
                  You completed {round} rounds in 30 seconds
                </p>
                <p className="text-sm text-muted-foreground">
                  Accuracy: {round > 0 ? Math.round((score / (round * 10)) * 100) : 0}%
                </p>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  The Stroop effect demonstrates the interference between automatic word reading 
                  and color recognition. Regular practice improves cognitive flexibility and attention control.
                </p>
              </div>
              
              <Button onClick={resetGame} className="w-full">
                Play Again
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </GameLayout>
  );
};

export default ColorStroop;
