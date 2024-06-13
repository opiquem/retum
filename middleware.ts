import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/']);
const isPublicRoute = createRouteMatcher(['/api/uploadthing']);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req) || !isPublicRoute(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
