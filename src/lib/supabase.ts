import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para o banco de dados
export interface EnvVariable {
  id: string;
  key: string;
  value: string;
  is_sensitive: boolean;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface AppConfig {
  id: string;
  app_url: string;
  resend_api_key?: string;
  keoto_webhook_secret?: string;
  openai_api_key?: string;
  created_at: string;
  updated_at: string;
}
