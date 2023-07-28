import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse(null, {
        status: 401,
        statusText: "Unauthorized",
      })
    }

    const workspace = await prisma.workspaceUser.findFirst({
      where: {
        userId: session.user.id,
      },
    })

    const workspaceWithUsers = await prisma.workspace.findUnique({
      where: {
        id: workspace?.workspaceId,
      },
      include: {
        users :{
            include: {
                user: true
            }
        },
      },

    })

    // const workspaceWithUsers =await prisma.workspaceUser.findFirst({
    //   where: {
    //     userId: session.user.id,
    //   },
    //   include: {

    //     workspace: {
    //       include: {
    //         users: true,
    //       },
    //     },
    //   },
    // })

    return new NextResponse(JSON.stringify({ data: workspaceWithUsers }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 422 })
  }
}
