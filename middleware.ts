import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from './lib/supabase/middleware';

const authPages = ['/login', '/recuperar-senha'];

function isAdmin(user: { app_metadata?: Record<string, unknown> } | null) {
  const role = user?.app_metadata?.role;
  const roles = user?.app_metadata?.roles;

  return role === 'admin' || (Array.isArray(roles) && roles.includes('admin'));
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const { response, user, copyCookies } = await updateSession(request);

  if (pathname.startsWith('/app') && !user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/login';
    redirectUrl.searchParams.set('redirectTo', pathname);

    const redirectResponse = NextResponse.redirect(redirectUrl);
    copyCookies?.(response, redirectResponse);
    return redirectResponse;
  }

  if (pathname.startsWith('/app/admin') && !isAdmin(user)) {
    const redirectResponse = NextResponse.redirect(new URL('/app', request.url));
    copyCookies?.(response, redirectResponse);
    return redirectResponse;
  }

  if (authPages.includes(pathname) && user) {
    const redirectResponse = NextResponse.redirect(new URL('/app', request.url));
    copyCookies?.(response, redirectResponse);
    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
