import { NextResponse } from "next/server";

const LOGGED_OUT_ONLY_PAGES = ["/", "/login", "/register"];

export async function middleware(request) {
  const sessionCheck = await fetch(
    new URL("/api/auth/get-session", request.url),
    {
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
    },
  );
  const session = await sessionCheck.json().catch(() => null);

  const { pathname } = request.nextUrl;
  const isLoggedOutOnly = LOGGED_OUT_ONLY_PAGES.includes(pathname);

  if (!session && !isLoggedOutOnly) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session && isLoggedOutOnly) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/dashboard/:path*"],
};
