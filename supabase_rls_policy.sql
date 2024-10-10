-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own user info" ON public.users;
DROP POLICY IF EXISTS "Admins can view all user info" ON public.users;

-- Create new policies
CREATE POLICY "Users can view own user info" 
ON public.users
FOR SELECT
USING (
  auth.uid() = id 
  OR 
  EXISTS (
    SELECT 1 
    FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.role = 'admin'
  )
);

CREATE POLICY "Admins can manage all user info" 
ON public.users
FOR ALL
USING (
  EXISTS (
    SELECT 1 
    FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.role = 'admin'
  )
);

-- Enable RLS on the users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;