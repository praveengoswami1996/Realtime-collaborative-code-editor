import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` injects/augments your `Request` with the user's token.
  async function middleware(request) {
    const { pathname } = request.nextUrl;
    const { token } = request.nextauth;

    // If token is there, that means user is authenticated
    const isAuthenticated = !!token;

    // Public routes that should not be accessible to the logged-in user
    const restrictedRoutes = ["/", "/login", "/register"];

    // If the user is authenticated and trying to access a restricted path,
    // then redirect them to a different page
    if(isAuthenticated && restrictedRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    // Otherwise, let the request proceed
    return NextResponse.next()
  },
);

export const config = { matcher: [
    "/dashboard",
    "/editor",
    "/project"
] };