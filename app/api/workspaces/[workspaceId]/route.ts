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

    
    const workspaceWithUsers = await prisma.workspace.aggregateRaw({
      pipeline: [
        {
          $match: { _id: { $oid: params.workspaceId } },
        },
        {
          $lookup: {
            from: "WorkspaceUser",
            localField: "_id",
            foreignField: "workspaceId",
            as: "users",
          },
        },
        {
          $unwind: "$users",
        },
        {
          $lookup: {
            from: "User",
            localField: "users.userId",
            foreignField: "_id",
            as: "users.user",
          },
        },
        {
          $unwind: "$users.user",
        },
        {
          $project: {
            _id: { $toString: "$_id" },
            name: 1,
            "users.user": {
              id: { $toString: "$users.user._id" },
              email: "$users.user.email",
              emailVerified: { $ifNull: ["$users.user.emailVerified", null] },
              name: "$users.user.name",
              image: { $ifNull: ["$users.user.image", null] },
            },
            "users.role": 1,
          },
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            users: { $push: { $mergeObjects: ["$users.user", { role: "$users.role" }] } },
          },
        },
    ]})

    return new NextResponse(JSON.stringify({ data: workspaceWithUsers[0] }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 422 })
  }
}
