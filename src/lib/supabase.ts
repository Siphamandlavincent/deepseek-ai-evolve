
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://atpyqdkekyscfoxrukic.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0cHlxZGtla3lzY2ZveHJ1a2ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzNDQ3NjgsImV4cCI6MjA2NjkyMDc2OH0._ML9iksVkeVkZhhrE_CAciGX620i1gB6SsXaw1KiMJI'

export const supabase = createClient(supabaseUrl, supabaseKey)
