import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest, {params}: {params: {workspaceId: string}}) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse(null, {
        status: 401,
        statusText: "Unauthorized",
      })
    }

    
    const workspaceWithMembers = await prisma.workspace.aggregateRaw({
      pipeline: [
        {
          $match: { _id: { $oid: params.workspaceId } },
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
            _id: { $toString: "$_id" },
            name: 1,
            "members.user": {
              id: { $toString: "$members.user._id" },
              email: "$members.user.email",
              emailVerified: { $ifNull: ["$members.user.emailVerified", null] },
              name: "$members.user.name",
              image: { $ifNull: ["$members.user.image", null] },
            },
            "members.role": 1,
          },
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            members: { $push: { $mergeObjects: ["$members.user", { role: "$members.role" }] } },
          },
        },
    ]})

    return new NextResponse(JSON.stringify({ data: workspaceWithMembers[0] }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 422 })
  }
}
