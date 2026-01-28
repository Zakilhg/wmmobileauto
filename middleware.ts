import { NextRequest, NextResponse } from "next/server";

const STUDIO_COOKIE = "studio_auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/studio")) {
    return NextResponse.next();
  }

  const username = process.env.STUDIO_USERNAME;
  const password = process.env.STUDIO_PASSWORD;

  if (!username || !password) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/studio/login")) {
    const isAuthed = request.cookies.get(STUDIO_COOKIE)?.value === `${username}:${password}`;
    if (isAuthed) {
      const url = request.nextUrl.clone();
      url.pathname = "/studio";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  const cookie = request.cookies.get(STUDIO_COOKIE)?.value;
  if (cookie === `${username}:${password}`) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/studio/login";
  url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/studio/:path*"],
};

