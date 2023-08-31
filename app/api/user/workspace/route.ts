import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"
import { getCurrentUser, getSession } from "@/lib/sessions"

export async function GET(req: NextRequest, res: NextResponse) {
  const user = await getCurrentUser()
  if (!user) return null

  const workspace = await prisma.workspaceMember.findFirst({
    where: {
      userId: user.id,
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

  return NextResponse.json(workspace?.workspace || null)
}
