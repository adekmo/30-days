// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  console.log(" Middleware running for:", req.nextUrl.pathname);
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
   console.log("Token di middleware:", token);

  const isAuth = !!token;
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
  const isAdminPage = req.nextUrl.pathname.startsWith("/admin");

  // Jika user sudah login dan akses halaman login, redirect ke dashboard
  if (isAuth && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Jika user belum login dan akses halaman yang dilindungi
  if (!isAuth && !isAuthPage && !req.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

    // 3. Proteksi khusus untuk halaman admin (role-based)
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!token || token.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/admin/:path*", // 🛡️ halaman admin
  ],
};