import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABSE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABSE_API_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey);


export default supabase;