
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import GameLayout from "@/components/GameLayout";
import Reward from "@/components/Reward";

// Shape types and their colors
const SHAPES = [
  { type: "circle", color: "bg-red-400" },
  { type: "square", color: "bg-blue-400" },
  { type: "triangle", color: "bg-green-400" },
] as const;

interface Shape {
  id: number;
  type: "circle" | "square" | "triangle";
  color: string;
  position: { x: number; y: number };
  velocity: number;
}

interface Bin {
  type: "circle" | "square" | "triangle";
  color: string;
  position: { x: number; width: number };
}

const SortItFast = () => {
  const [gameState, setGameState] = useState<"idle" | "playing" | "complete">("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 60 second game
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [bins, setBins] = useState<Bin[]>([]);
  const [errors, setErrors] = useState(0);
  const [showReward, setShowReward] = useState(false);
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const lastShapeTime = useRef(0);
  
  useEffect(() => {
    // Load high score from localStorage
    const savedHighScore = localStorage.getItem("sortItFastHighScore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
    
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    if (gameState === "playing") {
      // Create bins
      if (gameAreaRef.current) {
        const width = gameAreaRef.current.clientWidth;
        const binWidth = width / SHAPES.length;
        
        const newBins = SHAPES.map((shape, index) => ({
          type: shape.type,
          color: shape.color,
          position: {
            x: index * binWidth,
            width: binWidth
          }
        }));
        
        setBins(newBins);
      }
      
      // Start game loop
      lastShapeTime.current = Date.now();
      animationRef.current = requestAnimationFrame(gameLoop);
      
      // Start timer
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [gameState]);

  const startGame = () => {
    setScore(0);
    setErrors(0);
    setTimeLeft(60);
    setShapes([]);
    setShowReward(false);
    setGameState("playing");
  };

  const endGame = () => {
    setGameState("complete");
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    // Check if it's a new high score
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("sortItFastHighScore", score.toString());
      setShowReward(true);
    }
  };

  const gameLoop = () => {
    if (gameState !== "playing") return;
    
    const now = Date.now();
    const gameArea = gameAreaRef.current;
    
    if (!gameArea) {
      animationRef.current = requestAnimationFrame(gameLoop);
      return;
    }
    
    // Add new shape every 1-3 seconds
    if (now - lastShapeTime.current > Math.random() * 2000 + 1000) {
      const randomShapeIndex = Math.floor(Math.random() * SHAPES.length);
      const newShape: Shape = {
        id: now,
        type: SHAPES[randomShapeIndex].type,
        color: SHAPES[randomShapeIndex].color,
        position: {
          x: Math.random() * (gameArea.clientWidth - 40),
          y: -40 // Start above the game area
        },
        velocity: Math.random() * 2 + 1 // Random speed
      };
      
      setShapes(prev => [...prev, newShape]);
      lastShapeTime.current = now;
    }
    
    // Update shape positions
    setShapes(prevShapes => {
      return prevShapes
        .map(shape => {
          // Move shape down
          const newY = shape.position.y + shape.velocity;
          
          // Check if shape reached bottom
          if (newY > gameArea.clientHeight - 40) {
            // Check if shape is over the correct bin
            let correctBin = false;
            const binIndex = bins.findIndex(bin => bin.type === shape.type);
            
            if (binIndex >= 0) {
              const bin = bins[binIndex];
              if (
                shape.position.x + 20 >= bin.position.x &&
                shape.position.x + 20 <= bin.position.x + bin.position.width
              ) {
                // Shape in correct bin
                setScore(prev => prev + 10);
                correctBin = true;
              }
            }
            
            if (!correctBin) {
              // Shape in wrong bin
              setErrors(prev => prev + 1);
            }
            
            // Remove this shape
            return null;
          }
          
          return {
            ...shape,
            position: {
              ...shape.position,
              y: newY
            }
          };
        })
        .filter(Boolean) as Shape[]; // Remove shapes that reached bottom
    });
    
    animationRef.current = requestAnimationFrame(gameLoop);
  };

  const renderShape = (shape: Shape) => {
    const style = {
      left: `${shape.position.x}px`,
      top: `${shape.position.y}px`
    };
    
    if (shape.type === "circle") {
      return (
        <div 
          key={shape.id} 
          className={`absolute w-10 h-10 rounded-full ${shape.color}`}
          style={style}
        />
      );
    }
    
    if (shape.type === "square") {
      return (
        <div 
          key={shape.id} 
          className={`absolute w-10 h-10 ${shape.color}`}
          style={style}
        />
      );
    }
    
    if (shape.type === "triangle") {
      return (
        <div 
          key={shape.id} 
          className="absolute" 
          style={style}
        >
          <div className={`w-0 h-0 border-l-[20px] border-r-[20px] border-b-[40px] 
                          border-l-transparent border-r-transparent ${shape.color.replace('bg', 'border-b')}`} />
        </div>
      );
    }
  };

  return (
    <GameLayout 
      title="Sort It Fast"
      description="Sort falling shapes into the correct bins to test your problem-solving skills"
      backLink="/games"
    >
      {gameState === "playing" && (
        <div className="mb-6 flex justify-between">
          <div className="font-bold">Time: {timeLeft}s</div>
          <div className="font-bold">Score: {score}</div>
          <div className="text-destructive font-bold">Errors: {errors}</div>
        </div>
      )}
      
      <div 
        ref={gameAreaRef}
        className="bg-muted/30 rounded-lg overflow-hidden relative"
        style={{ height: '400px' }}
      >
        {gameState === "idle" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold mb-2">Sort Shapes Challenge</h3>
            <p className="text-muted-foreground mb-4">Sort falling shapes into matching bins as fast as you can!</p>
            <Button onClick={startGame} className="mint-gradient">Start Game</Button>
          </div>
        )}
        
        {gameState === "playing" && (
          <>
            {/* Render shapes */}
            {shapes.map(shape => renderShape(shape))}
            
            {/* Render bins */}
            <div className="absolute bottom-0 left-0 right-0 flex h-16">
              {bins.map((bin, index) => (
                <div 
                  key={index}
                  className={`h-full ${bin.color} border-t-2 border-white flex items-center justify-center`}
                  style={{ width: `${100 / bins.length}%` }}
                >
                  {bin.type === "circle" && <div className="w-8 h-8 rounded-full bg-white/30" />}
                  {bin.type === "square" && <div className="w-8 h-8 bg-white/30" />}
                  {bin.type === "triangle" && (
                    <div className="w-0 h-0 border-l-[16px] border-r-[16px] border-b-[32px] 
                                  border-l-transparent border-r-transparent border-b-white/30" />
                  )}
                </div>
              ))}
            </div>
          </>
        )}
        
        {gameState === "complete" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold mb-2">Game Over!</h3>
            <p className="mb-1">Your Score: {score}</p>
            <p className="mb-4">High Score: {highScore}</p>
            <Button onClick={startGame} className="mint-gradient">Play Again</Button>
          </div>
        )}
      </div>
      
      {gameState !== "idle" && (
        <Card className="mt-6">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <span>High Score</span>
              <span className="font-bold">{highScore}</span>
            </div>
          </CardContent>
        </Card>
      )}
      
      {showReward && <Reward />}
    </GameLayout>
  );
};

export default SortItFast;
