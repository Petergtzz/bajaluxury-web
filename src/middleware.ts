import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Skip middleware for static files
  if (
    path.startsWith("/_next/") || // Next.js static files
    path.startsWith("/favicon.ico") || // Favicon
    path.startsWith("/api/") // API routes (if any)
  ) {
    return NextResponse.next();
  }

  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  console.log("Path:", path);
  console.log("Is protected route:", isProtectedRoute);
  console.log("Is public route:", isPublicRoute);

  const cookie = req.cookies.get("session")?.value;
  console.log("Session cookie:", cookie);

  const session = await decrypt(cookie);
  console.log("Decrypted session:", session);

  if (isProtectedRoute && !session?.userId) {
    console.log("Redirecting to / (no session)");
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (isPublicRoute && session?.userId) {
    console.log("Redirecting to /dashboard (valid session)");
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}
