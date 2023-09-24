import { Role } from "@prisma/client"

import { Lead } from "@/types/lead"
import { getErrorMessage } from "@/lib/exceptions/errors"
import { prisma } from "@/lib/prisma"
import { getCurrentUserAndWorkspace } from "@/lib/sessions"

export async function getLeads() {
  try {
    const uw = await getCurrentUserAndWorkspace()

    if (!uw) {
      return { message: "User and workspace not found" }
    }

    const pipeline = []

    pipeline.push({
      $match: {
        workspaceId: { $oid: uw.workspaceId },
      },
    })

    if (uw.role === Role.SALES_AGENT) {
      pipeline.push({
        $match: {
          assigned_to: { $oid: uw.userId },
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

          workspaceId: 1,
          assigned_to: {
            _id: { $toString: "$user._id" },
            name: { $toString: "$user.name" },
          },
        },
      }
    )

    const leads = (await prisma.lead.aggregateRaw({
      pipeline,
    })) as unknown as Lead[]

    return { data: leads }
  } catch (error) {
    return { message: getErrorMessage(error) }
  }
}
