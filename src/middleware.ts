import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  // Debug: log all cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: request.cookies.getAll.bind(request.cookies),
        setAll: () => {}, // No-op, since you can't set cookies in middleware
      },
    }
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (request.nextUrl.pathname.startsWith('/new') && !user) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/new/:path*'],
};
