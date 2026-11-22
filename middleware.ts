import { NextRequest, NextResponse } from "next/server";
import { STUDIO_COOKIE, getStudioConfig, verifySessionToken } from "@/lib/studio-session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/studio")) {
    return NextResponse.next();
  }

  // Fail closed: without credentials and a session secret, nobody gets in.
  const config = getStudioConfig();
  if (!config) {
    return new NextResponse("Studio is not configured.", { status: 503 });
  }

  const isAuthed = await verifySessionToken(
    request.cookies.get(STUDIO_COOKIE)?.value,
    config.secret,
  );

  if (pathname.startsWith("/studio/login")) {
    if (isAuthed) {
      const url = request.nextUrl.clone();
      url.pathname = "/studio";
      url.search = "";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (isAuthed) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/studio/login";
  url.search = "";
  url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/studio/:path*"],
};
