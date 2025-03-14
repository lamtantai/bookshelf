import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://tyfhjycvkiwouuaiyuqa.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5ZmhqeWN2a2l3b3V1YWl5dXFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwMDMyMDMsImV4cCI6MjA1NjU3OTIwM30.8hAKf0dhObxOx_yf4En-Lk1yMFcb7LK2drx_jQgOdvQ";

const supabaseUrl = SUPABASE_URL;
const supabaseKey = SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
