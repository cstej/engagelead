import { headers } from "next/headers"
import { AppRouter } from "@/server"
import {
  createTRPCProxyClient,
  loggerLink,
  unstable_httpBatchStreamLink,
} from "@trpc/client"

import { getTrpcUrl, transformer } from "@/lib/shared"

export const api = createTRPCProxyClient<AppRouter>({
  transformer,
  links: [
    loggerLink({
      enabled: (op) =>
        process.env.NODE_ENV === "development" ||
        (op.direction === "down" && op.result instanceof Error),
    }),
    unstable_httpBatchStreamLink({
      url: getTrpcUrl(),
      headers() {
        const heads = new Map(headers())
        heads.set("x-trpc-source", "rsc")
        return Object.fromEntries(heads)
      },
    }),
  ],
})
