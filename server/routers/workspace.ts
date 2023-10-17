import { cookies } from "next/headers"
import { TRPCError } from "@trpc/server"
import _ from "lodash"
import { z } from "zod"

import { createTRPCRouter, protectedProcedure } from "../trpc"

export const workspaceRouter = createTRPCRouter({
  getUserWorkspaces: protectedProcedure.query(async ({ ctx }) => {
    const workspace = await ctx.prisma.workspaceMember.findMany({
      where: {
        userId: ctx.session.userId,
      },
      select: {
        workspace: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        workspace: {
          createdAt: "asc",
        },
      },
    })

    return _.map(workspace, (item) => ({
      id: _.get(item, "workspace.id"),
      name: _.get(item, "workspace.name"),
    }))
  }),

  switchWorkspace: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // const workspace = await ctx.prisma.workspace.findUnique({
      //   where: {
      //     id: input.id,
      //   },
      //   select: {
      //     id: true,
      //     name: true,
      //   },
      // })

      // if (!workspace) {
      //   throw new TRPCError({
      //     code: "INTERNAL_SERVER_ERROR",
      //     message: "Workspace does not found",
      //   })
      // }

      return cookies().set("workspace",JSON.stringify(input) )
    }),

  getMembers: protectedProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.workspaceMember.findMany({
      where: {
        workspaceId: ctx.session.workspaceId,
      },
      select: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    })

    return users.map((item) => item.user)
  }),
})
