import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.has("access_token");
  const PUBLIC_PATH_LIST = ["/sign-in", "/sign-up"];

  const isPublic = PUBLIC_PATH_LIST.includes(path);

  if (isPublic && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/chats/:path*", "/sign-in", "/sign-up"],
};
