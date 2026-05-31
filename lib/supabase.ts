import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublicKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseAdminKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublicKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabasePublicKey as string)
  : null;

export const supabaseAdmin = supabaseUrl && supabaseAdminKey
  ? createClient(supabaseUrl, supabaseAdminKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null;
