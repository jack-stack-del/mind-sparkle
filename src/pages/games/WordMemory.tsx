
import { useState, useEffect } from "react";
import GameLayout from "@/components/GameLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import confetti from "canvas-confetti";

const WordMemory = () => {
  const [gameState, setGameState] = useState<"menu" | "memorize" | "recall" | "result">("menu");
  const [words, setWords] = useState<string[]>([]);
  const [currentWords, setCurrentWords] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");
  const [correctWords, setCorrectWords] = useState<string[]>([]);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);

  const wordLists = [
    ["sun", "cat", "tree", "book", "car"],
    ["happy", "garden", "music", "ocean", "friend"],
    ["adventure", "rainbow", "chocolate", "mountain", "butterfly"],
    ["telephone", "umbrella", "basketball", "refrigerator", "computer"],
    ["extraordinary", "magnificent", "opportunity", "environment", "imagination"]
  ];

  const startGame = () => {
    const levelWords = wordLists[Math.min(level - 1, wordLists.length - 1)];
    const selectedWords = levelWords.slice(0, Math.min(2 + level, levelWords.length));
    setCurrentWords(selectedWords);
    setWords(selectedWords);
    setGameState("memorize");
    setTimeLeft(3 + level);
    setCorrectWords([]);
    setUserInput("");
  };

  useEffect(() => {
    if (gameState === "memorize" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameState === "memorize" && timeLeft === 0) {
      setGameState("recall");
    }
  }, [gameState, timeLeft]);

  const handleWordSubmit = () => {
    if (!userInput.trim()) return;
    
    const submittedWord = userInput.trim().toLowerCase();
    const isCorrect = words.some(word => word.toLowerCase() === submittedWord);
    
    if (isCorrect && !correctWords.includes(submittedWord)) {
      setCorrectWords([...correctWords, submittedWord]);
      setScore(score + 10);
    }
    
    setUserInput("");
    
    if (correctWords.length + 1 >= words.length) {
      setTimeout(() => {
        setGameState("result");
        if (correctWords.length + 1 === words.length) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      }, 500);
    }
  };

  const nextLevel = () => {
    setLevel(level + 1);
    startGame();
  };

  const resetGame = () => {
    setLevel(1);
    setScore(0);
    setGameState("menu");
  };

  return (
    <GameLayout
      title="Word Memory"
      description="Memorize words and recall them to strengthen your verbal memory"
      backLink="/games"
    >
      <div className="max-w-2xl mx-auto">
        {gameState === "menu" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Level {level}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-muted-foreground">
                You'll see {Math.min(2 + level, 5)} words. Memorize them, then type them back!
              </p>
              <p className="text-sm text-muted-foreground">Score: {score}</p>
              <Button onClick={startGame} className="w-full">
                Start Level {level}
              </Button>
            </CardContent>
          </Card>
        )}

        {gameState === "memorize" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Memorize These Words</CardTitle>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{timeLeft}s</p>
                <Progress value={(timeLeft / (3 + level)) * 100} className="mt-2" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {currentWords.map((word, index) => (
                  <div
                    key={index}
                    className="bg-primary/10 p-4 rounded-lg text-center text-xl font-semibold"
                  >
                    {word}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {gameState === "recall" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Type the Words You Remember</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleWordSubmit()}
                  placeholder="Type a word..."
                  className="flex-1 px-3 py-2 border rounded-md"
                  autoFocus
                />
                <Button onClick={handleWordSubmit}>Submit</Button>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Correct words: {correctWords.length} / {words.length}
                </p>
                <div className="flex flex-wrap gap-2">
                  {correctWords.map((word, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {gameState === "result" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                {correctWords.length === words.length ? "Perfect!" : "Good Try!"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p>You remembered {correctWords.length} out of {words.length} words</p>
              <p className="text-lg font-semibold">Score: {score}</p>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Words were:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {words.map((word, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded text-sm ${
                        correctWords.includes(word.toLowerCase())
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                {correctWords.length === words.length && level < 5 && (
                  <Button onClick={nextLevel} className="flex-1">
                    Next Level
                  </Button>
                )}
                <Button onClick={resetGame} variant="outline" className="flex-1">
                  Play Again
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </GameLayout>
  );
};

export default WordMemory;
