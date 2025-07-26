import CourseCard from "./CourseCard";
import { Button } from "@/components/ui/button";

const FeaturedCourses = () => {
  const courses = [
    {
      title: "Complete React Development Bootcamp",
      instructor: "Sarah Johnson",
      duration: "40 hours",
      students: 12500,
      rating: 4.9,
      price: "$89",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop&crop=face",
      category: "Programming",
      level: "Intermediate" as const,
      featured: true
    },
    {
      title: "Machine Learning with Python",
      instructor: "Dr. Michael Chen",
      duration: "60 hours",
      students: 8900,
      rating: 4.8,
      price: "$129",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop",
      category: "Data Science",
      level: "Advanced" as const
    },
    {
      title: "UI/UX Design Fundamentals",
      instructor: "Emma Williams",
      duration: "25 hours",
      students: 15600,
      rating: 4.7,
      price: "$69",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=250&fit=crop",
      category: "Design",
      level: "Beginner" as const
    },
    {
      title: "Digital Marketing Mastery",
      instructor: "David Rodriguez",
      duration: "35 hours",
      students: 20100,
      rating: 4.6,
      price: "$79",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      category: "Marketing",
      level: "Intermediate" as const
    },
    {
      title: "Cybersecurity Essentials",
      instructor: "Lisa Thompson",
      duration: "45 hours",
      students: 7800,
      rating: 4.8,
      price: "$99",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop",
      category: "Security",
      level: "Intermediate" as const
    },
    {
      title: "Photography for Beginners",
      instructor: "James Park",
      duration: "20 hours",
      students: 11200,
      rating: 4.5,
      price: "$49",
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=250&fit=crop",
      category: "Creative",
      level: "Beginner" as const
    }
  ];

  return (
    <section id="courses" className="py-20 bg-background">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Featured <span className="bg-gradient-primary bg-clip-text text-transparent">Courses</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular courses, handpicked by experts and loved by thousands of students worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;