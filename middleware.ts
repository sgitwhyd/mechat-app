import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const isLogged = request.cookies.has("token");

  if (!isLogged) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/chats/:path*"],
};
