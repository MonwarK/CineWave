import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/discover(.*)',
  '/profile(.*)',
  '/search(.*)',
  '/list(.*)',
  '/search(.*)',
  '/series(.*)',
  '/movies(.*)',
  '/trending(.*)',
]);
const isNonAuthRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/verify-email(.*)',
  '/sign-up(.*)',
  '/forgot-password(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (isProtectedRoute(req) && !userId) {
    const signInUrl = new URL('/', req.url);
    return NextResponse.redirect(signInUrl);
  }

  if (isNonAuthRoute(req) && userId) {
    const mainUrl = new URL('/discover', req.url);
    return NextResponse.redirect(mainUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
