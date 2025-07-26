import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Brain, 
  Video, 
  Award, 
  MessageCircle, 
  BarChart3, 
  Shield,
  Clock,
  Users,
  Smartphone
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Get personalized course recommendations and intelligent study paths tailored to your learning style and goals."
    },
    {
      icon: Video,
      title: "Interactive Video Lessons",
      description: "High-quality video content with interactive elements, quizzes, and progress tracking for better engagement."
    },
    {
      icon: Award,
      title: "Verified Certificates",
      description: "Earn industry-recognized certificates upon course completion to boost your career prospects."
    },
    {
      icon: MessageCircle,
      title: "Live Discussion Forums",
      description: "Connect with fellow learners and instructors through active community discussions and Q&A sessions."
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Track your learning progress with detailed analytics and insights to optimize your study habits."
    },
    {
      icon: Shield,
      title: "Secure Learning Environment",
      description: "Your data and progress are protected with enterprise-grade security and privacy measures."
    },
    {
      icon: Clock,
      title: "Learn at Your Pace",
      description: "Flexible scheduling allows you to learn whenever and wherever is convenient for you."
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from industry professionals and thought leaders with years of real-world experience."
    },
    {
      icon: Smartphone,
      title: "Mobile Learning",
      description: "Access your courses on any device with our responsive platform and mobile-optimized experience."
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why Choose <span className="bg-gradient-primary bg-clip-text text-transparent">Synapse Academy</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the future of online learning with our cutting-edge features designed to maximize your potential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} variant="glass" className="h-full">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-lg">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;