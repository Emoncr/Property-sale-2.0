


import { NextResponse } from "next/server";
import { decodedToken, getToken } from "./lib/action";

export async function middleware(req) {
  
  try {
    const { pathname } = req.nextUrl;

    // Skip static files and API routes
    const isStatic =
      pathname.startsWith("/_next") ||
      pathname.startsWith("/static") ||
      pathname.startsWith("/public") ||
      pathname.startsWith("/api") ||
      /\.(.*)$/.test(pathname);

    if (isStatic) return NextResponse.next();

    // Auth pages list
    const authPages = [
      "/login",
      "/signup",
      "/reset-password",
      "/forgot-password",
      "/new-password",
      "/set-password",
      "/thank-you",
    ];

    const isAuthPage = authPages.some((page) => pathname.startsWith(page));

    const authToken = await getToken();

    // If user is already logged in and tries to access auth pages, redirect to home
    if (authToken && isAuthPage) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // If user is not logged in and tries to access protected routes (not auth pages), redirect to login
    const isProtectedRoute = pathname.startsWith("/") && !isAuthPage;

    if (isProtectedRoute && !authToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
