import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};

const AUTH_PAGES = ["/auth/login", "/auth/register"];

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const path = url.pathname;
  const session: any = await getToken({ req });

  if (session && AUTH_PAGES.includes(path)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
}
