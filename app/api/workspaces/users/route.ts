import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
 
    try {
      const session = await getServerSession(authOptions)
      if (!session) {
        return new NextResponse(null, {
          status: 401,
          statusText: "Unauthorized",
        })
      }
  
      const workspaceWithUsers =await prisma.workspaceUser.findFirst({
        where: {
          userId: session.user.id,
        },
        include: {
          
          workspace: {
            include: {
              users: true,
            },
          },
        },
      })
  
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
  