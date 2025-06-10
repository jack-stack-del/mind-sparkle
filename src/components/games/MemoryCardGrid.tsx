
interface MemoryCard {
  id: number;
  symbol: string;
  flipped: boolean;
  matched: boolean;
}

interface MemoryCardGridProps {
  cards: MemoryCard[];
  onCardClick: (id: number) => void;
}

const MemoryCardGrid = ({ cards, onCardClick }: MemoryCardGridProps) => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {cards.map(card => (
        <button
          key={card.id}
          onClick={() => onCardClick(card.id)}
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
  );
};

export default MemoryCardGrid;
