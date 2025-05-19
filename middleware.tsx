import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const currentPath = req.nextUrl.pathname;

  const isAuthPage = currentPath === "/login";
  const isDashboard = currentPath === "/dashboard";

  // If user is not logged in and trying to access dashboard, redirect to login
  if (!token && isDashboard) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If user is logged in and trying to access login page, redirect to dashboard
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// 👇 Match only dashboard and login routes
export const config = {
  matcher: ["/dashboard"],
};
