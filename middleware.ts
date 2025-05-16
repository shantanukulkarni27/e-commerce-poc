import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

//   console.log(`🧠 Middleware running on ${pathname}`);

  const publicPaths = ["/auth/login", "/auth/register"];
  const isPublicPath = publicPaths.includes(req.nextUrl.pathname);

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/products", req.url));
  }

  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(token ? "/products" : "/auth/login", req.url)
    );
  }
  // Block protected pages if not logged in
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Prevent visiting login/register if already logged in
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/products", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|static|favicon.ico|api).*)", // Match everything except excluded folders
  ],
};
