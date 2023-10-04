import { z } from "zod"

import { prisma } from "@/lib/prisma"

import { authProcedure, publicProcedure, router } from "./trpc"

export const appRouter = router({
  // public procedures


  // authenticated procedures
  getAllFieldDefination: authProcedure.input(z.string()).query(async ({ ctx, input }) => {

    console.log( input)
    return await prisma.fieldDefinition.findMany({
      where: {
        workspaceId: ctx.workspaceId,
      },
      select: {
        id: true,
        name: true,
        type: true,
        options: true,
        workspaceId: true,
        label: true,
      },
    })
  }),
})

export type AppRouter = typeof appRouter
