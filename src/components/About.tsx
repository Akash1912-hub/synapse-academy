import { Users, Award, BookOpen, Globe } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            About Synapse Academy
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We're revolutionizing online education with cutting-edge technology and world-class instructors. 
            Our mission is to make quality education accessible to everyone, anywhere in the world.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">50,000+</h3>
            <p className="text-muted-foreground">Active Students</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">1,200+</h3>
            <p className="text-muted-foreground">Courses Available</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">500+</h3>
            <p className="text-muted-foreground">Expert Instructors</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">150+</h3>
            <p className="text-muted-foreground">Countries Reached</p>
          </div>
        </div>

        <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">Our Story</h3>
              <p className="text-muted-foreground mb-4">
                Founded in 2020, Synapse Academy began with a simple vision: to bridge the gap between 
                traditional education and the rapidly evolving digital world. Our founders, experienced 
                educators and technologists, recognized the need for a platform that combines academic 
                rigor with practical skills.
              </p>
              <p className="text-muted-foreground">
                Today, we're proud to be at the forefront of educational innovation, offering courses 
                that prepare students for the careers of tomorrow while maintaining the highest standards 
                of academic excellence.
              </p>
            </div>
            <div className="bg-gradient-primary/10 rounded-xl p-8 border border-primary/20">
              <h4 className="text-xl font-semibold mb-4">Our Mission</h4>
              <p className="text-muted-foreground">
                To democratize access to world-class education and empower learners worldwide to 
                achieve their full potential through innovative, technology-enhanced learning experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;