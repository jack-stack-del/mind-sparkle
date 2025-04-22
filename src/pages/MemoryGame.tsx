
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, Clock, Brain } from "lucide-react";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const MemoryGame = () => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameState, setGameState] = useState<'ready' | 'watching' | 'repeating' | 'success' | 'failed'>('ready');
  const [highScore, setHighScore] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  const buttonColors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
  ];

  useEffect(() => {
    // Load highscore from localStorage
    const savedHighScore = localStorage.getItem('memoryGameHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  useEffect(() => {
    if (gameState === 'watching') {
      let displaySequenceTimeout: NodeJS.Timeout;
      
      const displaySequence = async () => {
        for (let i = 0; i < sequence.length; i++) {
          await new Promise((resolve) => {
            displaySequenceTimeout = setTimeout(resolve, 500);
          });
          setPlayerSequence([...playerSequence, sequence[i]]);
          
          await new Promise((resolve) => {
            displaySequenceTimeout = setTimeout(resolve, 500);
          });
          setPlayerSequence([]);
        }
        
        setGameState('repeating');
      };
      
      displaySequence();
      
      return () => {
        clearTimeout(displaySequenceTimeout);
      };
    }
  }, [gameState, sequence]);

  useEffect(() => {
    if (gameState === 'repeating' && playerSequence.length > 0) {
      // Check if player's sequence is correct so far
      for (let i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== sequence[i]) {
          endGame(false);
          return;
        }
      }
      
      // Check if player has completed the sequence
      if (playerSequence.length === sequence.length) {
        setGameState('success');
        setScore(score + level * 10);
        setTimeout(() => {
          nextLevel();
        }, 1000);
      }
    }
  }, [playerSequence]);

  const startGame = () => {
    setIsPlaying(true);
    setLevel(1);
    setScore(0);
    setPlayerSequence([]);
    generateSequence(3); // Start with 3 items
    setGameState('watching');
  };

  const generateSequence = (length: number) => {
    const newSequence = Array.from({ length }, () => Math.floor(Math.random() * 4));
    setSequence(newSequence);
  };

  const nextLevel = () => {
    setLevel(level + 1);
    setPlayerSequence([]);
    generateSequence(Math.min(3 + Math.floor(level / 2), 10)); // Increase sequence length every 2 levels, max 10
    setGameState('watching');
  };

  const handleButtonPress = (buttonIndex: number) => {
    if (gameState !== 'repeating') return;
    
    setPlayerSequence([...playerSequence, buttonIndex]);
  };

  const endGame = (success: boolean) => {
    setIsPlaying(false);
    setGameState(success ? 'success' : 'failed');
    
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('memoryGameHighScore', score.toString());
      
      toast({
        title: "New High Score!",
        description: `You achieved a new personal best of ${score} points!`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container max-w-6xl py-6">
        <div className="flex justify-between items-center mb-8">
          <Button variant="outline" onClick={() => navigate("/")}>
            Back to Dashboard
          </Button>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Award className="text-primary h-5 w-5" />
              <span className="text-lg font-medium">Score: {score}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="text-primary h-5 w-5" />
              <span className="text-lg font-medium">Level: {level}</span>
            </div>
          </div>
        </div>

        <Card className="border-t-4 border-neuro-memory">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-neuro-memory" />
              Memory Challenge
            </CardTitle>
            <CardDescription>
              Watch the sequence of colors and repeat it. The sequence will get longer as you progress.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isPlaying && gameState === 'ready' && (
              <div className="text-center py-12">
                <h3 className="text-2xl font-semibold mb-4">Memory Training</h3>
                <p className="mb-8 text-muted-foreground max-w-md mx-auto">
                  This exercise enhances your working memory by challenging you to remember and repeat sequences of increasing length.
                </p>
                <Button size="lg" onClick={startGame}>
                  Start Challenge
                </Button>
              </div>
            )}
            
            {gameState === 'failed' && (
              <div className="text-center py-12">
                <h3 className="text-2xl font-semibold mb-4">Challenge Complete</h3>
                <p className="text-lg mb-2">Your Score: <span className="font-bold">{score}</span></p>
                <p className="text-muted-foreground mb-8">High Score: {highScore}</p>
                <Button size="lg" onClick={startGame}>
                  Try Again
                </Button>
              </div>
            )}
            
            {(isPlaying || gameState === 'success') && (
              <>
                <div className="flex justify-center mb-8">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      {gameState === 'watching' ? 'Watch the sequence' : 
                       gameState === 'repeating' ? 'Now repeat the sequence' : 
                       gameState === 'success' ? 'Great job! Next level coming up...' : ''}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {buttonColors.map((color, index) => (
                        <button
                          key={index}
                          className={`w-24 h-24 rounded-lg transition-transform ${color} ${
                            playerSequence.includes(index) ? "scale-95 brightness-150 shadow-lg" : ""
                          } ${
                            gameState === 'repeating' ? "hover:brightness-110 cursor-pointer" : ""
                          }`}
                          disabled={gameState !== 'repeating'}
                          onClick={() => handleButtonPress(index)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Progress value={(playerSequence.length / sequence.length) * 100} className="w-full max-w-md h-2" />
                </div>
              </>
            )}
          </CardContent>
          {isPlaying && (
            <CardFooter>
              <p className="w-full text-center text-sm text-muted-foreground">
                Complete {sequence.length} steps to advance to the next level
              </p>
            </CardFooter>
          )}
        </Card>
      </main>
    </div>
  );
};

export default MemoryGame;
