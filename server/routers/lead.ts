import { Role } from "@prisma/client"
import { TRPCError } from "@trpc/server"

import { Lead } from "../schema/lead.schema"
import { createTRPCRouter, protectedProcedure } from "../trpc"

export const leadRouter = createTRPCRouter({
  getAllLeads: protectedProcedure.query(async ({ ctx }) => {
    const pipeline = []

    pipeline.push({
      $match: {
        workspaceId: { $oid: ctx.session.workspaceId },
      },
    })

    if (ctx.session.role === Role.SALES_AGENT) {
      pipeline.push({
        $match: {
          assigned_to: { $oid: ctx.session.userId },
        },
      })
    }

    pipeline.push(
      {
        $lookup: {
          from: "User",
          localField: "assigned_to",
          foreignField: "_id",
          as: "user",
        },
      },

      {
        $unwind: {
          path: "$user",
        },
      },

      {
        $project: {
          _id: 0,
          id: { $toString: "$_id" },
          name: 1,
          email: 1,
          phone: 1,
          createdAt: { $toString: "$createdAt" },
          updatedAt: {
            $toString: "$updatedAt",
          },
          lead_source: 1,
          lead_status: 1,

          workspaceId: { $toString: "$workspaceId" },
          assigned_to: {
            _id: { $toString: "$user._id" },
            name: { $toString: "$user.name" },
          },
        },
      }
    )

    return (await ctx.prisma.lead.aggregateRaw({
      pipeline,
    })) as unknown as Lead[]
  }),
})
