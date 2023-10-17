import { cookies } from "next/headers"
import { NextResponse, type NextRequest } from "next/server"
import { initTRPC, TRPCError } from "@trpc/server"
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch"
import { getServerSession } from "next-auth"
import superjson from "superjson"
import { ZodError } from "zod"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getErrorMessage } from "@/lib/exceptions/errors"

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */

interface CreateContextOptions {
  headers: Headers,
}
/**
 * This helper generates the "internals" for a tRPC context. If you need to use it, you can export
 * it from here.
 *
 * Examples of things you may need it for:
 * - testing, so we don't have to mock Next.js' req/res
 * - tRPC's `createSSGHelpers`, where we don't have req/res
 *
 * @see https://create.t3.gg/en/usage/trpc#-serverapitrpcts
 */
export const createInnerTRPCContext = async (opts: CreateContextOptions) => {
  return {
    headers: opts.headers,
    prisma,
    getErrorMessage,
  }
}


/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = async (opts: {
  req: NextRequest
}) => {
  // Fetch stuff that depends on the request

  return await createInnerTRPCContext({
    headers: opts.req.headers,
  })
}

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure

const enforceUserIsAuthed = t.middleware(async ({ ctx, next }) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized Request",
    })
  }

  const Cookies = cookies()

  const isWorkspace = Cookies.has("workspace")
    ? Cookies.get("workspace")?.value
    : null

  if (!isWorkspace) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Workspace does not found",
    })
  }

  const workspace = JSON.parse(isWorkspace) as { id: string; name: string }

  const uw = await ctx.prisma.workspaceMember.findFirst({
    where: {
      userId: session.user.id,
      workspaceId: workspace.id,
    },
    select: {
      role: true,
      workspace: {
        select: {
          name: true,
        },
      },
    },
  })

  if (!uw) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized Request",
    })
  }

  return next({
    ctx: {
      session: {
        userId: session.user.id,
        userName: session.user.name,
        emailVerified: session.user.emailVerified,
        email: session.user.email,
        workspaceId: workspace.id,
        role: uw.role,
        workspaceName: uw.workspace.name,
      },
    },
  })
})

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed)
