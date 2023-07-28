import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

/**
 *
 * @param req
 * @description It is used
 */

async function GetUserByEmail(
  req: NextRequest,
  { params }: { params: { emailId: string } }
) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: params.emailId,
      },
    })

    return NextResponse.json({
      user: !!user,
    })
  } catch (error) {
    console.log(error)
  }
}

export { GetUserByEmail as GET }
