import { type NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"
import { getErrorMessage } from "@/lib/exceptions/errors"

/**
 *
 * @param req
 * @description It is used
 */

async function GetUserByEmail(
  req: NextRequest,
  { params }: { params: { emailId: string } }
): Promise<NextResponse> {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: params.emailId,
      },
    })

    return NextResponse.json({
      isUser: !!user,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: getErrorMessage(error) }, { status: 500 })
  }
}

export { GetUserByEmail as GET }
