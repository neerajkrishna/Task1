import { NextRequest, NextResponse } from "next/server";

//const WHITELISTED_IPS = "20.218.226.24";
const WHITELISTED_IPS = "37.201.117.4";
export function middleware(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "";
  if (!WHITELISTED_IPS.includes(ip)) {
    return new NextResponse(`Access denied.`, {
      status: 403,
      headers: { "Content-Type": "text/plain" },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
