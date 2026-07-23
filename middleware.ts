import { NextResponse } from "next/server";

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

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
