import { appRouter } from "@/server"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
let resHeaders : Headers
const handler = (req: Request,) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    router: appRouter,
    req,
    createContext: () => ({
      req,
      resHeaders,
    }),
    onError:
      process.env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
            )
          }
        : undefined,
  })

export { handler as GET, handler as POST }
