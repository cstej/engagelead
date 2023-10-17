import {type NextRequest } from "next/server"
import { appRouter } from "@/server"
import { createTRPCContext } from "@/server/trpc"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    router: appRouter,
    req,
    createContext: () => createTRPCContext({ req, }),
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
