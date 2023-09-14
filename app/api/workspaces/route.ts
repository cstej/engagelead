import { NextRequest, NextResponse } from "next/server"
import _ from "lodash"
import { getServerSession } from "next-auth"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// Define a schema for workspace creation data
const createWorkspaceSchema = z.object({
  name: z.string().min(2).max(50),
})

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse(null, {
        status: 401,
        statusText: "Unauthorized",
      })
    }

    const data = createWorkspaceSchema.parse(await req.json())

    const createdWorkspace = await prisma.workspace.create({
      data: {
        name: data.name,
        members: {
          create: {
            user: {
              connect: {
                id: session.user.id,
              },
            },
            role: "ADMIN",

          },
        },
      },
    })

    revalidatePath("/app/")
    return new NextResponse(JSON.stringify({ data: createdWorkspace }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.log(error)
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })
    }
  }
}

// this api is used for geting all workspace  by user id for zustland store

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse(null, {
        status: 401,
        statusText: "Unauthorized",
      })
    }
    const workspace = await prisma.workspaceMember.findMany({
      where: {
        userId: session.user.id,
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

    const workspaceData = _.map(workspace, (item) => ({
      id: _.get(item, "workspace.id"),
      name: _.get(item, "workspace.name"),
      // createdAt: _.get(item, "workspace.createdAt"),
    }))

    return NextResponse.json({ data: workspaceData })
  } catch (error) {
    console.log(error)
  }
}
