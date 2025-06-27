import { NextRequest, NextResponse } from "next/server";

const WHITELISTED_IPS = ["20.218.226.24"];
// "152.58.200.125"

export function middleware(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "";
  console.log("from middleware");
  console.log(ip);
  if (!WHITELISTED_IPS.includes(ip)) {
    return new NextResponse(`Access denied. ip:${ip}`, {
      status: 403,
      headers: { "Content-Type": "text/plain" },
    });
  }

  return NextResponse.next({
    headers: { "x-middleware-debug": "ran" },
  });
}

export const config = {
  matcher: "/:path*",
};
