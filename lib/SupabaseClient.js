import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.DATABASE_URL
const supabaseAnonKey = process.env.DIRECT_URL


const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase