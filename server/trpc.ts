import { initTRPC, TRPCError } from "@trpc/server"

import { getCurrentUserAndWorkspace } from "@/lib/sessions"

const t = initTRPC.create()

export const router = t.router
const middleware = t.middleware

const isAuth = middleware(async (opts) => {
  const uw = await getCurrentUserAndWorkspace()

  if (!uw) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized Request",
    })
  }

  return opts.next({
    ctx: {
      ...uw,
    },
  })
})

export const publicProcedure = t.procedure
export const authProcedure = t.procedure.use(isAuth)
