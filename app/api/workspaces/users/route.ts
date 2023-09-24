// get all users in a workspace

import { type NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"
import { getCurrentUserAndWorkspace } from "@/lib/sessions"
import _ from "lodash"
import { getErrorMessage } from "@/lib/exceptions/errors"
import { HttpStatusCode } from "axios"

export async function GET(req: NextRequest): Promise<NextResponse> {

  try {

    const uw = await getCurrentUserAndWorkspace()

    if (!uw) {
     return NextResponse.json({ message: "Unauthorized Request" }, { status: HttpStatusCode.Unauthorized })
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
    
  } catch (error) {
    

    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: HttpStatusCode.InternalServerError }
    )
  }



}
