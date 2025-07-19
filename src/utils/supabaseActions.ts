'use server';

import { createServer } from './supabase/server';

// Define ProviderType according to supported providers
export type ProviderType = 'github' | 'google' | 'email';

export const SupabaseAuthenticationAsync = async (
  authProvider: ProviderType = 'github',
  email?: string,
  password?: string
) => {
  const supabase = createServer();
  if (authProvider !== 'email') {
    return await supabase.auth.signInWithOAuth({
      provider: authProvider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      },
    });
  } else {
    if (!email || !password) {
      throw new Error(
        'Email and password are required for email authentication'
      );
    }
    return await supabase.auth.signInWithPassword({ email, password });
  }
};
