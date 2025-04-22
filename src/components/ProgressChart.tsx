
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Award, TrendingUp } from "lucide-react";

const ProgressChart = () => {
  // Mock data - will be replaced with actual user data in the future
  const stats = [
    { name: "Memory", score: 72, icon: Brain, color: "text-neuro-memory" },
    { name: "Attention", score: 65, icon: Award, color: "text-neuro-attention" },
    { name: "Creativity", score: 85, icon: TrendingUp, color: "text-neuro-creative" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
        <CardDescription>Track your cognitive development</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats.map((stat) => (
            <div key={stat.name} className="flex items-center">
              <stat.icon className={`h-5 w-5 mr-2 ${stat.color}`} />
              <div className="w-full">
                <div className="flex justify-between mb-1 text-sm">
                  <span>{stat.name}</span>
                  <span className="font-medium">{stat.score}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${stat.color.replace('text', 'bg')}`} 
                    style={{ width: `${stat.score}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressChart;
