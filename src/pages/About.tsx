
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Target, Users, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const features = [
    {
      icon: Brain,
      title: "Science-Based Training",
      description: "Our games are designed based on the latest neuroscience research on neuroplasticity and cognitive enhancement."
    },
    {
      icon: Target,
      title: "Personalized Experience",
      description: "Adaptive difficulty ensures you're always challenged at the right level for optimal brain growth."
    },
    {
      icon: Users,
      title: "Progress Tracking",
      description: "Monitor your cognitive development with detailed analytics and insights into your brain training journey."
    },
    {
      icon: Award,
      title: "Gamified Learning",
      description: "Stay motivated with achievements, streaks, and engaging challenges that make brain training fun."
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container max-w-6xl py-8">
        {/* Hero Section */}
        <section className="text-center py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">NeuroQuest</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            NeuroQuest is a cutting-edge brain training platform that harnesses the power of neuroplasticity 
            to help you unlock your cognitive potential through scientifically-designed exercises.
          </p>
          <Button size="lg" asChild>
            <Link to="/register">Start Your Journey <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                We believe that everyone has untapped cognitive potential waiting to be unlocked. 
                Our mission is to make brain training accessible, engaging, and effective for people 
                of all ages and backgrounds.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                By combining the latest neuroscience research with modern technology and game design, 
                we create personalized training experiences that adapt to your unique learning patterns 
                and help you achieve measurable cognitive improvements.
              </p>
            </div>
            <div className="bg-primary/5 rounded-2xl p-8">
              <div className="text-center">
                <Brain className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Neuroplasticity-Driven</h3>
                <p className="text-muted-foreground">
                  Every exercise is designed to promote the formation of new neural pathways, 
                  strengthening your brain's natural ability to adapt and grow.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose NeuroQuest?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-0">
            <CardContent className="text-center py-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Mind?</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of users who are already experiencing the benefits of targeted brain training. 
                Start your cognitive enhancement journey today.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/register">Get Started Free</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/games">Try Demo Games</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default About;
