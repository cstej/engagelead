import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"

// Define your public API routes

const publicApiRoutes = ["/api/public"]

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })
    const isAuth = !!token

    // Protecting API Routes And Setting Headers

    // const isAuthApi = req.nextUrl.pathname.startsWith("/api/")
    // const isPublicApi = publicApiRoutes.some((route) =>
    //   req.nextUrl.pathname.startsWith(route)
    // )
    // // Allow access to public API
    // if (isPublicApi) {
    //   return null
    // }

    // if (isAuthApi && !isAuth) {
    //   return new NextResponse("Unauthorized", { status: 401 })
    // }

    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/signup")

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }

      return null
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname
      if (req.nextUrl.search) {
        from += req.nextUrl.search
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      )
    }
  },

  {
    callbacks: {
      async authorized() {
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/workspace",],
}
