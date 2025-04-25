
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import GameLayout from "@/components/GameLayout";
import Reward from "@/components/Reward";
import { Timer } from "lucide-react";

// Card symbols using emoji for simplicity
const SYMBOLS = ["🍎", "🍌", "🍇", "🍓", "🍊", "🍉", "🍋", "🍍"];

interface MemoryCard {
  id: number;
  symbol: string;
  flipped: boolean;
  matched: boolean;
}

const MatchFlip = () => {
  const [gameState, setGameState] = useState<"idle" | "playing" | "complete">("idle");
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [moves, setMoves] = useState(0);
  const [bestMoves, setBestMoves] = useState(Infinity);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [bestTime, setBestTime] = useState(Infinity);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [showReward, setShowReward] = useState(false);
  
  useEffect(() => {
    // Load best scores from localStorage
    const savedBestMoves = localStorage.getItem("matchFlipBestMoves");
    if (savedBestMoves) {
      setBestMoves(parseInt(savedBestMoves, 10));
    }
    
    const savedBestTime = localStorage.getItem("matchFlipBestTime");
    if (savedBestTime) {
      setBestTime(parseFloat(savedBestTime));
    }
    
    // Timer for game
    let timer: NodeJS.Timer | null = null;
    if (gameState === "playing") {
      timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameState]);

  const startGame = () => {
    // Create pairs of cards
    const cardPairs = [...SYMBOLS, ...SYMBOLS];
    
    // Shuffle the cards
    const shuffled = cardPairs
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        flipped: false,
        matched: false
      }));
    
    setCards(shuffled);
    setMoves(0);
    setTimeElapsed(0);
    setFlippedCards([]);
    setShowReward(false);
    setGameState("playing");
  };

  const handleCardClick = (id: number) => {
    // Ignore if more than two cards flipped or clicking on already flipped card
    if (flippedCards.length >= 2 || cards[id].flipped || cards[id].matched) {
      return;
    }
    
    // Flip the card
    const updatedCards = [...cards];
    updatedCards[id].flipped = true;
    setCards(updatedCards);
    
    // Add to flipped cards
    const updatedFlippedCards = [...flippedCards, id];
    setFlippedCards(updatedFlippedCards);
    
    // If two cards flipped, check for match
    if (updatedFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      const [firstId, secondId] = updatedFlippedCards;
      const firstCard = updatedCards[firstId];
      const secondCard = updatedCards[secondId];
      
      if (firstCard.symbol === secondCard.symbol) {
        // Match found
        firstCard.matched = true;
        secondCard.matched = true;
        setFlippedCards([]);
        
        // Check if game complete
        if (updatedCards.every(card => card.matched)) {
          setTimeout(() => {
            setGameState("complete");
            
            // Check for new best scores
            let newRecord = false;
            
            if (moves < bestMoves) {
              setBestMoves(moves);
              localStorage.setItem("matchFlipBestMoves", moves.toString());
              newRecord = true;
            }
            
            if (timeElapsed < bestTime) {
              setBestTime(timeElapsed);
              localStorage.setItem("matchFlipBestTime", timeElapsed.toString());
              newRecord = true;
            }
            
            if (newRecord) {
              setShowReward(true);
            }
          }, 500);
        }
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          updatedCards[firstId].flipped = false;
          updatedCards[secondId].flipped = false;
          setCards([...updatedCards]);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <GameLayout 
      title="Match & Flip"
      description="Test your memory by matching pairs of cards"
      backLink="/games"
    >
      {gameState === "playing" && (
        <div className="mb-6 flex justify-between">
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-primary" />
            <span className="font-bold">{formatTime(timeElapsed)}</span>
          </div>
          <div className="font-bold">
            Moves: {moves}
          </div>
        </div>
      )}
      
      <div className="bg-muted/30 rounded-lg p-4 min-h-[350px] flex flex-col justify-center">
        {gameState === "idle" && (
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Memory Challenge</h3>
            <p className="text-muted-foreground mb-4">Find matching pairs of cards in as few moves as possible</p>
            <Button onClick={startGame} className="mint-gradient">Start Game</Button>
          </div>
        )}
        
        {gameState === "playing" && (
          <div className="grid grid-cols-4 gap-3">
            {cards.map(card => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`aspect-square rounded-lg transition-all transform ${
                  card.flipped || card.matched 
                    ? 'bg-white rotate-y-180' 
                    : 'bg-primary text-primary-foreground'
                } ${card.matched ? 'opacity-70' : ''}`}
                disabled={card.matched}
              >
                {(card.flipped || card.matched) && (
                  <span className="text-3xl">{card.symbol}</span>
                )}
              </button>
            ))}
          </div>
        )}
        
        {gameState === "complete" && (
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Well Done!</h3>
            <p className="mb-1">Time: {formatTime(timeElapsed)}</p>
            <p className="mb-4">Moves: {moves}</p>
            <Button onClick={startGame} className="mint-gradient">Play Again</Button>
          </div>
        )}
      </div>
      
      {gameState !== "idle" && (
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
      )}
      
      {showReward && <Reward />}
    </GameLayout>
  );
};

export default MatchFlip;
