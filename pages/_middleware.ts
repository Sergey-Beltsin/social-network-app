import { NextRequest, NextResponse } from "next/server";
import decode from "jwt-decode";
import { publicRoutes } from "@/shared/lib/constants";

type Token = {
  email: string;
  sub: string;
  username: string;
  iat: number;
  exp: number;
};

export function middleware(req: NextRequest) {
  let res: NextResponse = NextResponse.next();
  const { token } = req.cookies;
  const pagePath: string = req.page.name as string;

  if (!token && !publicRoutes.includes(pagePath)) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    res = NextResponse.redirect(url);
    res.clearCookie("token");
    return res;
  }

  if (!token) {
    return res;
  }

  const decodedToken: Token = decode(token);
  const isTokenExpired: boolean = Date.now() >= decodedToken.exp * 1000;

  if (isTokenExpired) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    res = NextResponse.redirect(url);
    res.clearCookie("token");
    return res;
  }

  if (token && publicRoutes.includes(pagePath)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${decodedToken.username}`;
    res = NextResponse.redirect(url);
  }

  return res;
}
