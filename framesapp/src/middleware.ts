import { clerkMiddleware, createRouteMatcher} from "@clerk/nextjs/server";


const isProtectedRoutes = createRouteMatcher([
    '/dashboard(.*)', 
    '/api/payment',
    '/payment(.*)',
])

export default clerkMiddleware(async (authPromise, req) => {
    console.log("Request URL:", req.url);
    const auth = await authPromise;
    if (isProtectedRoutes(req)) {
        console.log("Protected route accessed:", req.url);
        auth.protect();
    } else {
        console.log("Unprotected route accessed:", req.url);
    }
});
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
