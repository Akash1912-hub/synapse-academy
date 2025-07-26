import { Button } from "@/components/ui/button";
import { Play, Star, Users, Award } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-16 h-16 bg-primary-glow/20 rounded-full animate-float" />
      <div className="absolute top-40 right-32 w-12 h-12 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-32 w-20 h-20 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-10 container max-w-screen-xl mx-auto px-4">
        <div className="text-center space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Master New Skills
              <br />
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                Transform Your Future
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Join thousands of learners in our AI-powered platform. Learn from expert instructors, 
              get personalized recommendations, and earn recognized certificates.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="xl" className="group">
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Start Learning Today
            </Button>
            <Button variant="glass" size="xl">
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto mt-16">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg mx-auto mb-2">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">50K+</div>
              <div className="text-sm text-white/70">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg mx-auto mb-2">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">4.9/5</div>
              <div className="text-sm text-white/70">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg mx-auto mb-2">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-sm text-white/70">Courses</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg mx-auto mb-2">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">100+</div>
              <div className="text-sm text-white/70">Expert Instructors</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;