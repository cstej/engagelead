import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"
import { getCurrentUserAndWorkspace } from "@/lib/sessions"

export async function GET(req: NextRequest) {
  const uw = await getCurrentUserAndWorkspace()

  if (!uw) {
    return new NextResponse(null, {
      status: 401,
      statusText: "Unauthorized",
    })
  }

  const fieldDefination = await prisma.fieldDefinition.findMany({
    where: {
      workspaceId: uw.workspaceId,
    },
    select: {
      id: true,
      name: true,
      type: true,
      options: true,
      workspaceId: true,
      label: true,
    },
  })

  return NextResponse.json(fieldDefination)
}
