
import { useState } from "react";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Brain, Clock, Sparkles, PuzzleIcon, Zap } from "lucide-react";

type GameCategory = "memory" | "focus" | "reaction" | "problem" | "pattern";

const GamesHub = () => {
  const [selectedCategory, setSelectedCategory] = useState<GameCategory>("memory");

  const gameCategories = [
    {
      id: "memory",
      name: "Memory",
      icon: Brain,
      description: "Strengthen your recall and working memory capacity"
    },
    {
      id: "focus",
      name: "Focus & Attention",
      icon: Clock,
      description: "Enhance concentration and attention to detail"
    },
    {
      id: "reaction",
      icon: Zap,
      name: "Reaction Speed",
      description: "Improve your response time and reflexes"
    },
    {
      id: "problem",
      name: "Problem Solving",
      icon: PuzzleIcon,
      description: "Build logical reasoning and critical thinking"
    },
    {
      id: "pattern",
      name: "Pattern Recognition",
      icon: Sparkles,
      description: "Develop your ability to identify patterns"
    }
  ];
  
  const gamesByCategory = {
    memory: [
      {
        id: "matchflip",
        title: "Match & Flip",
        description: "Flip cards and match pairs to test your memory",
        path: "/games/matchflip",
        imageUrl: "/placeholder.svg",
        difficulty: "Medium"
      },
      {
        id: "wordmemory", 
        title: "Word Memory",
        description: "Memorize words and recall them to strengthen verbal memory",
        path: "/games/wordmemory",
        imageUrl: "/placeholder.svg",
        difficulty: "Easy" 
      },
      {
        id: "patternrecall", 
        title: "Pattern Recall",
        description: "Remember and repeat sequences of colors or symbols",
        path: "/games/patternrecall",
        imageUrl: "/placeholder.svg",
        difficulty: "Hard" 
      }
    ],
    focus: [
      {
        id: "numberorder",
        title: "Number Order",
        description: "Tap numbers 1-20 in order as fast as you can",
        path: "/games/numberorder",
        imageUrl: "/placeholder.svg",
        difficulty: "Medium"
      },
      {
        id: "colorstroop",
        title: "Color Stroop",
        description: "Identify text colors while ignoring word meaning",
        path: "/games/colorstroop",
        imageUrl: "/placeholder.svg",
        difficulty: "Hard"
      }
    ],
    reaction: [
      {
        id: "speedtap",
        title: "Speed Tap",
        description: "Tap when specific colors or symbols appear",
        path: "/games/speedtap",
        imageUrl: "/placeholder.svg",
        difficulty: "Easy"
      },
      {
        id: "simplereaction",
        title: "Simple Reaction",
        description: "Test your basic reaction time with simple stimuli",
        path: "/games/simplereaction",
        imageUrl: "/placeholder.svg",
        difficulty: "Easy"
      }
    ],
    problem: [
      {
        id: "sortitfast",
        title: "Sort It Fast",
        description: "Sort falling shapes into correct bins quickly",
        path: "/games/sortitfast",
        imageUrl: "/placeholder.svg",
        difficulty: "Hard"
      }
    ],
    pattern: [
      {
        id: "patternrecall",
        title: "Pattern Recall",
        description: "Remember and repeat sequences of colors or symbols",
        path: "/games/patternrecall",
        imageUrl: "/placeholder.svg",
        difficulty: "Hard"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container max-w-6xl py-8">
        <h1 className="text-3xl font-bold mb-2">Brain Training Games</h1>
        <p className="text-muted-foreground mb-8">
          Choose a category to find games that train specific cognitive skills
        </p>
        
        <Tabs defaultValue="memory" value={selectedCategory} onValueChange={(val) => setSelectedCategory(val as GameCategory)}>
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
            {gameCategories.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="flex gap-2 items-center"
              >
                <category.icon className="h-4 w-4" />
                <span className="hidden md:inline">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {gameCategories.map(category => (
            <TabsContent key={category.id} value={category.id}>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <category.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{category.name}</h2>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gamesByCategory[category.id as GameCategory]?.map(game => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

interface GameProps {
  game: {
    title: string;
    description: string;
    path: string;
    imageUrl: string;
    difficulty: string;
  };
}

const GameCard = ({ game }: GameProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="aspect-video bg-muted overflow-hidden">
        <img 
          src={game.imageUrl} 
          alt={game.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{game.title}</CardTitle>
          <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
            {game.difficulty}
          </span>
        </div>
        <CardDescription>{game.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild className="w-full mint-gradient">
          <Link to={game.path}>Play Game</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GamesHub;
