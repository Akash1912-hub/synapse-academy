-- Drop the existing policy that's causing issues
DROP POLICY IF EXISTS "Instructors can create courses" ON public.courses;

-- Create a corrected policy for course creation
CREATE POLICY "Instructors can create courses" 
ON public.courses 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles p 
    WHERE p.id = instructor_id 
    AND p.user_id = auth.uid() 
    AND p.role = 'instructor'
  )
);