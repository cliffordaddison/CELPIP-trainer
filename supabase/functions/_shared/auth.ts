import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export async function getUser(request: Request): Promise<{ user: any; error: any }> {
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return { user: null, error: 'No authorization header' };
    }
    
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return { user: null, error: error?.message || 'Invalid token' };
    }
    
    return { user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
}

export function requireAuth(request: Request): Promise<{ user: any; error: any }> {
  return getUser(request);
}
