import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getErrorMessage } from "@/lib/exceptions/errors"
import { HttpStatusCode } from "axios"

export async function DELETE(
  req: NextRequest,
  { params }: { params: { leadId: string } }
) : Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized Request" },
        { status: HttpStatusCode.Unauthorized }
      )
    }
    const lead = await prisma.lead.delete({
      where: {
        id: params.leadId,
      },
    })

    return NextResponse.json({ lead })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: getErrorMessage(error) }, { status: HttpStatusCode.InternalServerError })
  }
}
