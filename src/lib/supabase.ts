import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wsaewpnrvbdlmawpoctr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzYWV3cG5ydmJkbG1hd3BvY3RyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzODMwODQsImV4cCI6MjA0Mzk1OTA4NH0.FJodJVz2pwqWYsg7PAdsHXtfuUyoMYCl7vbryGzbHv0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)