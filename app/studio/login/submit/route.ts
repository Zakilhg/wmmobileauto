import { NextRequest, NextResponse } from "next/server";

const STUDIO_COOKIE = "studio_auth";

function safeRedirectPath(path: string) {
  if (path.startsWith("/studio")) {
    return path;
  }
  return "/studio";
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");
  const from = safeRedirectPath(String(formData.get("from") || "/studio"));

  const expectedUser = process.env.STUDIO_USERNAME;
  const expectedPass = process.env.STUDIO_PASSWORD;

  if (!expectedUser || !expectedPass) {
    return NextResponse.redirect(new URL("/studio", request.url), 303);
  }

  if (username !== expectedUser || password !== expectedPass) {
    const url = new URL("/studio/login", request.url);
    url.searchParams.set("error", "1");
    url.searchParams.set("from", from);
    return NextResponse.redirect(url, 303);
  }

  const redirectUrl = new URL(from, request.url);
  const response = NextResponse.redirect(redirectUrl, 303);
  response.cookies.set({
    name: STUDIO_COOKIE,
    value: `${expectedUser}:${expectedPass}`,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/studio",
  });
  return response;
}
