// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://atpyqdkekyscfoxrukic.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0cHlxZGtla3lzY2ZveHJ1a2ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzNDQ3NjgsImV4cCI6MjA2NjkyMDc2OH0._ML9iksVkeVkZhhrE_CAciGX620i1gB6SsXaw1KiMJI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});