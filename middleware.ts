import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"

export default withAuth(
  async function middleware(req) {
    try {
      const isDashboardPage = req.nextUrl.pathname.startsWith("/app")
      const token = await getToken({ req })
      const isAuth = !!token
      const isAuthPage =
        req.nextUrl.pathname.startsWith("/login") ||
        req.nextUrl.pathname.startsWith("/signup")

      if (isAuthPage) {
        if (isAuth) {
          // Redirect authenticated users to the dashboard.
          return NextResponse.redirect(new URL("/app/dashboard", req.url))
        }

        // If it's an authentication page and the user is not authenticated, allow access.
        return null
      }

      if (!isAuth) {
        // If the user is not authenticated, redirect them to the login page with the 'from' parameter.
        let from = req.nextUrl.pathname
        if (req.nextUrl.search) {
          from += req.nextUrl.search
        }

        return NextResponse.redirect(
          new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
        )
      }

      if (isDashboardPage) {
        const workspace = cookies().get("workspace")?.value

        if (workspace === "null" || workspace === "{}" || !workspace) {
          // If workspace information is missing or empty, fetch it.

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_APP_URL}/api/user/workspace`,
            {
              method: "GET",
              cache: "no-store",
              headers: {
                "Content-Type": "application/json",
                Cookie: cookies().toString(),
              },
            }
          )

          if (res.status === 200) {
            const cw = await res.json()

            if (!cw) {
              console.log("redirecting to workspace setup")
              // If workspace information is still missing, redirect to workspace setup.
              return NextResponse.redirect(new URL("/workspace", req.url))
            }

            if (cw) {
              console.log("setting workspace cookie")
              // If workspace information is available, set it as a cookie and continue.
              const response = NextResponse.redirect(req.url)
              response.cookies.set("workspace", JSON.stringify(cw))
              return response
            }
          }
        }
      }
    } catch (err) {
      console.log(err)
    }
  },
  {
    callbacks: {
      async authorized({ req, token }) {
        // This callback can be used for additional authorization checks if needed.
        return true
      },
    },
  }
)

export const config = {
  // Define the URL patterns to which this middleware should be applied.
  matcher: ["/app/:path*", "/login", "/workspace", "/accept-invite"],
}
