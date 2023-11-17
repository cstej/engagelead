import { cookies } from "next/headers"
import { Role } from "@prisma/client"
import { TRPCError } from "@trpc/server"
import _ from "lodash"
import { z } from "zod"

import { memberSchema } from "@/lib/zodSchemas"

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

      return cookies().set("workspace", JSON.stringify(input))
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

  getMembersWithRole: protectedProcedure
    .output(z.array(memberSchema))
    .query(async ({ ctx }) => {
      const data = await ctx.prisma.workspace.aggregateRaw({
        pipeline: [
          {
            $match: { _id: { $oid: ctx.session.workspaceId } },
          },
          {
            $lookup: {
              from: "WorkspaceMember",
              localField: "_id",
              foreignField: "workspaceId",
              as: "members",
            },
          },
          {
            $unwind: "$members",
          },
          {
            $lookup: {
              from: "User",
              localField: "members.userId",
              foreignField: "_id",
              as: "members.user",
            },
          },
          {
            $unwind: "$members.user",
          },
          {
            $project: {
              _id: 0,
              memberId: { $toString: "$members._id" },
              userId: { $toString: "$members.user._id" },
              email: "$members.user.email",
              name: "$members.user.name",
              image: { $ifNull: ["$members.user.image", null] },
              role: "$members.role",
              workspaceId: { $toString: "$members.workspaceId" },
            },
          },
        ],
      })

      return data as unknown as z.infer<typeof memberSchema>[]
    }),

  updateMemberRole: protectedProcedure
    .input(
      z.object({
        memberId: z.string(),
        role: z.nativeEnum(Role),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.prisma.workspaceMember.update({
        where: {
          id: input.memberId,
        },
        data: {
          role: input.role,
        },
      })

      return data
    }),
})
