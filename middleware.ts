import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isPrivate = req.nextUrl.pathname.startsWith("/(private)");
  if (!isPrivate) return NextResponse.next();

  const hasSession = req.cookies.get("auth_session");
  if (!hasSession) {
    const url = new URL("/signin", req.url);
    url.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/(private/:path*)"] };