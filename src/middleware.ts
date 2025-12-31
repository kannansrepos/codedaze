import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET || "your-secret-key-change-this-in-production"
  });

  const { pathname } = request.nextUrl;

  // Protect /new and /admin routes
  if (pathname.startsWith('/new') || pathname.startsWith('/admin')) {
    if (!token) {
      // Redirect to adminlogin instead of login
      const loginUrl = new URL('/adminlogin', request.url);
      return NextResponse.redirect(loginUrl);
    }

    // If user has a valid token, they are admin (since only admins can authenticate)
    // No need to check NEXT_PUBLIC_ADMIN_USERS
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/new/:path*', '/admin/:path*'],
};
