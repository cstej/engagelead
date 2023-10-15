import { cookies } from "next/headers"
import { initTRPC, TRPCError } from "@trpc/server"
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch"
import { getServerSession } from "next-auth"
import superjson from "superjson"
import { ZodError } from "zod"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export const createContext = ({
  req,
  resHeaders,
}: FetchCreateContextFnOptions) => ({
  req,
  resHeaders,
})

const t = initTRPC.context<typeof createContext>().create({
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

export const router = t.router
const middleware = t.middleware

const isAuth = middleware(async (opts) => {
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
      message: "Workspace not found",
    })
  }

  const workspace = JSON.parse(isWorkspace) as { id: string; name: string }

  const uw = await prisma.workspaceMember.findFirst({
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

  return opts.next({
    ctx: {
      ...opts.ctx,
      userId: session.user.id,
      userName: session.user.name,
      emailVerified: session.user.emailVerified,
      email: session.user.email,
      workspaceId: workspace.id,
      role: uw.role,
      workspaceName: uw.workspace.name,
    },
  })
})

export const publicProcedure = t.procedure
export const authProcedure = t.procedure.use(isAuth)
