// get all users in a workspace

import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"
import { getCurrentUserAndWorkspace } from "@/lib/sessions"
import _ from "lodash"

export async function GET(req: NextRequest) {

  const uw = await getCurrentUserAndWorkspace()

  if (!uw) {
    return new NextResponse(null, {
      status: 401,
      statusText: "Unauthorized",
    })
  }

  const users = await prisma.workspaceMember.findMany({
    where: {
        workspaceId: uw.workspaceId
    },
    select:{
        user: {
            select: {
                id: true,
                name: true,
                email: true,
                image: true
            }
        }
    },

  })

  const userList = users.map((item) => item.user);


  return NextResponse.json(userList)
}
