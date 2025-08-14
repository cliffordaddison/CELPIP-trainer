import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

export class RateLimiter {
  private supabase: any;
  
  constructor() {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    this.supabase = createClient(supabaseUrl, supabaseServiceKey);
  }
  
  async checkRateLimit(
    identifier: string, 
    config: RateLimitConfig = { maxRequests: 100, windowMs: 900000 }
  ): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
    try {
      const now = Date.now();
      const windowStart = now - config.windowMs;
      
      // Get current count for this identifier
      const { data: currentCount, error } = await this.supabase
        .from('rate_limits')
        .select('count, reset_time')
        .eq('identifier', identifier)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      
      let count = 0;
      let resetTime = now + config.windowMs;
      
      if (currentCount) {
        // Check if window has reset
        if (currentCount.reset_time < now) {
          count = 1;
          resetTime = now + config.windowMs;
        } else {
          count = currentCount.count + 1;
          resetTime = currentCount.reset_time;
        }
      } else {
        count = 1;
      }
      
      // Upsert the rate limit record
      await this.supabase
        .from('rate_limits')
        .upsert({
          identifier,
          count,
          reset_time: resetTime,
          updated_at: new Date().toISOString()
        });
      
      const allowed = count <= config.maxRequests;
      const remaining = Math.max(0, config.maxRequests - count);
      
      return { allowed, remaining, resetTime };
    } catch (error) {
      console.error('Rate limit check failed:', error);
      // Fail open - allow request if rate limiting fails
      return { allowed: true, remaining: 999, resetTime: Date.now() + 900000 };
    }
  }
}

export async function checkRateLimit(
  request: Request, 
  identifier: string
): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
  const limiter = new RateLimiter();
  return await limiter.checkRateLimit(identifier);
}
