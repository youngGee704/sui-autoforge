import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://krryepbfnchjpvtanhqf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtycnllcGJmbmNoanB2dGFuaHFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyNTY4MDcsImV4cCI6MjA1ODgzMjgwN30.x4GF74zFfKAWNPhwpBt3-sSHutmmTVCpJUjywTrN7qU"; 

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
