import { createHash, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_MAX_AGE_SECONDS,
  STUDIO_COOKIE,
  createSessionToken,
  getStudioConfig,
} from "@/lib/studio-session";

function safeRedirectPath(path: string) {
  if (path.startsWith("/studio")) {
    return path;
  }
  return "/studio";
}

// Hash both sides first so the buffers have equal length, then compare in
// constant time.
function safeEqual(a: string, b: string) {
  const hashA = createHash("sha256").update(a).digest();
  const hashB = createHash("sha256").update(b).digest();
  return timingSafeEqual(hashA, hashB);
}

export async function POST(request: NextRequest) {
  const config = getStudioConfig();
  if (!config) {
    return new NextResponse("Studio is not configured.", { status: 503 });
  }

  const formData = await request.formData();
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");
  const from = safeRedirectPath(String(formData.get("from") || "/studio"));

  // Evaluate both so a wrong username takes as long as a wrong password.
  const userOk = safeEqual(username, config.username);
  const passOk = safeEqual(password, config.password);

  if (!(userOk && passOk)) {
    const url = new URL("/studio/login", request.url);
    url.searchParams.set("error", "1");
    url.searchParams.set("from", from);
    return NextResponse.redirect(url, 303);
  }

  const response = NextResponse.redirect(new URL(from, request.url), 303);
  response.cookies.set({
    name: STUDIO_COOKIE,
    value: await createSessionToken(config.secret),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/studio",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return response;
}
