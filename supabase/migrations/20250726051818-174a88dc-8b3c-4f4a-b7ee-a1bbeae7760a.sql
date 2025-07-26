-- Update courses table to support more comprehensive course data
ALTER TABLE public.courses 
ADD COLUMN IF NOT EXISTS price DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS duration_minutes INTEGER,
ADD COLUMN IF NOT EXISTS difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
ADD COLUMN IF NOT EXISTS category TEXT,
ADD COLUMN IF NOT EXISTS thumbnail_url TEXT,
ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Create course materials table for PDFs, videos, assignments, etc.
CREATE TABLE IF NOT EXISTS public.course_materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  material_type TEXT NOT NULL CHECK (material_type IN ('video', 'pdf', 'quiz', 'assignment', 'document')),
  file_url TEXT,
  content_text TEXT,
  sort_order INTEGER DEFAULT 0,
  is_free BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on course materials
ALTER TABLE public.course_materials ENABLE ROW LEVEL SECURITY;

-- RLS policies for course materials
CREATE POLICY "Anyone can view published course materials" 
ON public.course_materials 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.courses 
    WHERE courses.id = course_materials.course_id 
    AND courses.is_published = true
  )
);

CREATE POLICY "Instructors can manage their course materials" 
ON public.course_materials 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.courses c
    JOIN public.profiles p ON c.instructor_id = p.id
    WHERE c.id = course_materials.course_id 
    AND p.user_id = auth.uid()
    AND p.role = 'instructor'
  )
);

-- Add RLS policies for course updates and deletes
CREATE POLICY "Instructors can update their own courses" 
ON public.courses 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p 
    WHERE p.id = courses.instructor_id 
    AND p.user_id = auth.uid() 
    AND p.role = 'instructor'
  )
);

CREATE POLICY "Instructors can delete their own courses" 
ON public.courses 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p 
    WHERE p.id = courses.instructor_id 
    AND p.user_id = auth.uid() 
    AND p.role = 'instructor'
  )
);

-- Create storage bucket for course materials
INSERT INTO storage.buckets (id, name, public) 
VALUES ('course-materials', 'course-materials', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for course materials
CREATE POLICY "Anyone can view course material files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'course-materials');

CREATE POLICY "Instructors can upload course materials" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'course-materials' AND 
  auth.role() = 'authenticated'
);

CREATE POLICY "Instructors can update their course materials" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'course-materials' AND 
  auth.role() = 'authenticated'
);

CREATE POLICY "Instructors can delete their course materials" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'course-materials' AND 
  auth.role() = 'authenticated'
);

-- Add trigger for updated_at
CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON public.courses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_course_materials_updated_at
  BEFORE UPDATE ON public.course_materials
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();