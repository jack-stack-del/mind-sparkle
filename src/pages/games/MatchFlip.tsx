
import { useState, useEffect } from "react";
import GameLayout from "@/components/GameLayout";
import Reward from "@/components/Reward";
import GameTimer from "@/components/games/GameTimer";
import MemoryCardGrid from "@/components/games/MemoryCardGrid";
import GameStats from "@/components/games/GameStats";
import GameResults from "@/components/games/GameResults";
import GameStartScreen from "@/components/games/GameStartScreen";

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
    let timerId: number | undefined = undefined;
    if (gameState === "playing") {
      timerId = window.setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (timerId !== undefined) {
        window.clearInterval(timerId);
      }
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

  return (
    <GameLayout 
      title="Match & Flip"
      description="Test your memory by matching pairs of cards"
      backLink="/games"
    >
      {gameState === "playing" && (
        <GameTimer timeElapsed={timeElapsed} moves={moves} />
      )}
      
      <div className="bg-muted/30 rounded-lg p-4 min-h-[350px] flex flex-col justify-center">
        {gameState === "idle" && (
          <GameStartScreen onStartGame={startGame} />
        )}
        
        {gameState === "playing" && (
          <MemoryCardGrid cards={cards} onCardClick={handleCardClick} />
        )}
        
        {gameState === "complete" && (
          <GameResults 
            timeElapsed={timeElapsed} 
            moves={moves} 
            onPlayAgain={startGame} 
          />
        )}
      </div>
      
      {gameState !== "idle" && (
        <GameStats bestTime={bestTime} bestMoves={bestMoves} />
      )}
      
      {showReward && <Reward />}
    </GameLayout>
  );
};

export default MatchFlip;
