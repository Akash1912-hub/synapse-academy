import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star, Play } from "lucide-react";

interface CourseCardProps {
  title: string;
  instructor: string;
  duration: string;
  students: number;
  rating: number;
  price: string;
  image: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  featured?: boolean;
}

const CourseCard = ({ 
  title, 
  instructor, 
  duration, 
  students, 
  rating, 
  price, 
  image, 
  category, 
  level,
  featured = false 
}: CourseCardProps) => {
  return (
    <Card variant={featured ? "featured" : "course"} className="group">
      {/* Course Image */}
      <div className="relative overflow-hidden rounded-t-xl">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button variant="glass" size="sm">
            <Play className="mr-2 h-4 w-4" />
            Preview
          </Button>
        </div>
        <Badge 
          className="absolute top-3 left-3"
          variant={level === "Beginner" ? "secondary" : level === "Intermediate" ? "default" : "destructive"}
        >
          {level}
        </Badge>
        {featured && (
          <Badge className="absolute top-3 right-3 bg-gradient-accent">
            Featured
          </Badge>
        )}
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
        <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">by {instructor}</p>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {duration}
          </div>
          <div className="flex items-center">
            <Users className="mr-1 h-4 w-4" />
            {students.toLocaleString()} students
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-2">
        <div className="text-2xl font-bold text-primary">{price}</div>
        <Button variant="gradient" size="sm">
          Enroll Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;