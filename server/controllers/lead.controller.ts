import { Ctx } from "@/types"
import { Role } from "@prisma/client"
import { TRPCError } from "@trpc/server"

import { getErrorMessage } from "@/lib/exceptions/errors"
import { prisma } from "@/lib/prisma"

import { Lead } from "../schema/lead.schema"

export const getAllLeads = async ({ ctx }: { ctx: Ctx }) => {
  try {
    const pipeline = []

    pipeline.push({
      $match: {
        workspaceId: { $oid: ctx.workspaceId },
      },
    })

    if (ctx.role === Role.SALES_AGENT) {
      pipeline.push({
        $match: {
          assigned_to: { $oid: ctx.userId },
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

    return (await prisma.lead.aggregateRaw({
      pipeline,
    })) as unknown as Lead[]
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: getErrorMessage(error),
    })
  }
}
