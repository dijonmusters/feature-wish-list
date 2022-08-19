import { createClient } from "@supabase/supabase-js";
import { Database } from "../supabase.types";
// supabase gen types typescript --db-url postgres:[YOUR-PASSWORD]@db.qrqukbonrknbvalshjtb.supabase.co:5432/postgres > supabase.types.ts

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export default supabase;
