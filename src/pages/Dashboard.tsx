
import Header from "@/components/Header";
import GameCard from "@/components/GameCard";
import ProgressChart from "@/components/ProgressChart";
import { Brain, ChevronRight, Clock, Award, Sparkles, PuzzleIcon, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const gameCards = [
    {
      title: "Memory Mode",
      description: "Strengthen your recall and working memory",
      icon: Brain,
      colorClass: "border-neuro-memory",
      path: "/games",
      comingSoon: false,
    },
    {
      title: "Attention Mode",
      description: "Enhance focus and concentration",
      icon: Clock,
      colorClass: "border-neuro-attention",
      path: "/games",
      comingSoon: false,
    },
    {
      title: "Creative Mode",
      description: "Develop divergent thinking and imagination",
      icon: Sparkles,
      colorClass: "border-neuro-creative",
      path: "/games",
      comingSoon: true,
    },
    {
      title: "Problem-Solving Mode",
      description: "Build logical reasoning and critical thinking",
      icon: PuzzleIcon,
      colorClass: "border-neuro-problem",
      path: "/games",
      comingSoon: false,
    },
    {
      title: "Emotional Regulation",
      description: "Improve emotional intelligence and response",
      icon: Heart,
      colorClass: "border-neuro-emotional",
      path: "/games",
      comingSoon: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container max-w-6xl py-6">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">
              Continue your brain training journey with personalized exercises.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/assessment">Take Assessment</Link>
            </Button>
            <Button asChild className="mint-gradient">
              <Link to="/games">Daily Challenge</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium">Brain Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Brain className="h-5 w-5 mr-2 text-primary" />
                <span className="text-2xl font-bold">1,240</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                +120 points this week
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium">Daily Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Award className="h-5 w-5 mr-2 text-neuro-creative" />
                <span className="text-2xl font-bold">5 days</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Keep it going!
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium">Next Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-neuro-attention" />
                <span className="text-md font-semibold">Complete Memory Level 5</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                You're 60% there
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 mb-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Brain Training Games</h2>
            <Button variant="ghost" size="sm" className="text-muted-foreground" asChild>
              <Link to="/games">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {gameCards.map((game) => (
              <GameCard
                key={game.title}
                title={game.title}
                description={game.description}
                icon={game.icon}
                colorClass={game.colorClass}
                path={game.path}
                comingSoon={game.comingSoon}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProgressChart />
          
          <Card>
            <CardHeader>
              <CardTitle>Neuroplasticity Insight</CardTitle>
              <CardDescription>Daily brain science fact</CardDescription>
            </CardHeader>
            <CardContent className="prose">
              <p className="text-muted-foreground">
                "Each time you practice a memory game, your brain forms new synaptic 
                connections. Regular training can increase the density of these 
                neural networks, helping your brain process information more efficiently."
              </p>
              <Button variant="link" className="p-0 h-auto" asChild>
                <Link to="/insights">Read more insights</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
