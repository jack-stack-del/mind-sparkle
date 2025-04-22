
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import BrainAnimation from "@/components/BrainAnimation";
import { Brain, ArrowRight, Sparkles, Clock, Award, PuzzleIcon, Heart } from "lucide-react";

const Index = () => {
  const features = [
    {
      title: "Memory Training",
      description: "Build your recall abilities and working memory capacity.",
      icon: Brain,
      color: "text-neuro-memory",
      bgColor: "bg-neuro-memory/10",
    },
    {
      title: "Focus Enhancement",
      description: "Improve concentration and attention to detail.",
      icon: Clock,
      color: "text-neuro-attention",
      bgColor: "bg-neuro-attention/10",
    },
    {
      title: "Creative Expansion",
      description: "Boost divergent thinking and creative problem-solving.",
      icon: Sparkles,
      color: "text-neuro-creative",
      bgColor: "bg-neuro-creative/10", 
    },
    {
      title: "Problem Solving",
      description: "Develop logical reasoning and critical thinking.",
      icon: PuzzleIcon,
      color: "text-neuro-problem", 
      bgColor: "bg-neuro-problem/10",
    },
    {
      title: "Emotional Intelligence",
      description: "Strengthen emotional awareness and regulation.",
      icon: Heart,
      color: "text-neuro-emotional",
      bgColor: "bg-neuro-emotional/10", 
    },
    {
      title: "Progress Tracking",
      description: "Monitor your cognitive development over time.",
      icon: Award,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  NeuroQuest:
                </span>{" "}
                Train Your Brain, Unlock Your Potential
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Experience personalized cognitive training that adapts to your progress. Build memory, sharpen focus, and enhance creative thinking through science-backed exercises.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" asChild>
                  <Link to="/register">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/games/memory">Try a Game</Link>
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="w-full max-w-md animate-float">
                <BrainAnimation />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How NeuroQuest Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our brain training platform uses neuroplasticity principles to help you build cognitive strength through regular, targeted exercises.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-card rounded-lg p-6 border shadow-sm hover:shadow-md transition-all"
              >
                <div className={`${feature.bgColor} w-12 h-12 flex items-center justify-center rounded-full mb-4`}>
                  <feature.icon className={`${feature.color} h-6 w-6`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-background border rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold">Ready to Boost Your Brain Power?</h2>
              <p className="text-lg text-muted-foreground">
                Start your personalized brain training journey today and discover your full cognitive potential.
              </p>
              <div className="pt-4">
                <Button size="lg" className="animate-pulse-glow" asChild>
                  <Link to="/register">Create Your Free Account</Link>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground pt-4">
                No credit card required. Start with our free plan.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-card border-t py-10 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">NeuroQuest</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">Home</Link>
              <Link to="/about" className="hover:text-primary">About</Link>
              <Link to="/games" className="hover:text-primary">Games</Link>
              <Link to="/science" className="hover:text-primary">The Science</Link>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} NeuroQuest. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
