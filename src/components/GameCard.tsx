
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface GameCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  colorClass: string;
  path: string;
  comingSoon?: boolean;
}

const GameCard = ({ title, description, icon: Icon, colorClass, path, comingSoon = false }: GameCardProps) => {
  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg border-t-4 ${colorClass}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <Icon className={`h-6 w-6 ${colorClass.replace('border', 'text')}`} />
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="h-24 flex items-center justify-center">
          <div className={`rounded-full p-5 ${colorClass.replace('border', 'bg')}/10`}>
            <Icon className={`h-10 w-10 ${colorClass.replace('border', 'text')}`} />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {comingSoon ? (
          <Button className="w-full" disabled>
            Coming Soon
          </Button>
        ) : (
          <Button className="w-full" asChild>
            <Link to={path}>Play Now</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default GameCard;
