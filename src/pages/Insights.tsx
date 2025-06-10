
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, ArrowLeft, BookOpen, Lightbulb, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Insights = () => {
  const insights = [
    {
      title: "The Science of Neuroplasticity",
      description: "Understanding how your brain adapts and grows through training",
      content: "Neuroplasticity is the brain's ability to reorganize itself by forming new neural connections throughout life. This means that through consistent practice and challenges, you can literally rewire your brain to become more efficient at processing information, solving problems, and remembering details.",
      icon: Brain,
      category: "Science"
    },
    {
      title: "Memory and Working Memory",
      description: "How memory games strengthen your cognitive abilities",
      content: "Working memory is like your brain's notepad - it holds information temporarily while you work with it. Regular memory training exercises increase the capacity and efficiency of this system, leading to better focus, problem-solving, and learning abilities in daily life.",
      icon: BookOpen,
      category: "Memory"
    },
    {
      title: "The Role of Attention Training",
      description: "Why focus exercises improve more than just concentration",
      content: "Attention training doesn't just help you focus better - it strengthens the neural networks responsible for executive control. This leads to improvements in decision-making, emotional regulation, and the ability to switch between tasks efficiently.",
      icon: Lightbulb,
      category: "Focus"
    },
    {
      title: "Progressive Difficulty and Learning",
      description: "How challenging yourself optimally promotes brain growth",
      content: "The brain grows strongest when challenged at the right level - not too easy, not too hard. This 'zone of proximal development' encourages the formation of new neural pathways while building confidence and maintaining motivation.",
      icon: TrendingUp,
      category: "Learning"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container max-w-4xl py-8">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          
          <h1 className="text-3xl font-bold mb-2">Neuroplasticity Insights</h1>
          <p className="text-muted-foreground">
            Discover the science behind brain training and how NeuroQuest helps optimize your cognitive potential.
          </p>
        </div>

        <div className="grid gap-6">
          {insights.map((insight, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <insight.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-xl">{insight.title}</CardTitle>
                      <span className="text-xs font-medium px-2 py-1 bg-accent/20 text-accent-foreground rounded-full">
                        {insight.category}
                      </span>
                    </div>
                    <CardDescription>{insight.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {insight.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Ready to Train Your Brain?</h2>
              <p className="text-muted-foreground mb-6">
                Put these insights into practice with our scientifically-designed brain training games.
              </p>
              <Button size="lg" asChild>
                <Link to="/games">Start Training</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Insights;
