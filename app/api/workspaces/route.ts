import { revalidatePath } from "next/cache"
import { NextResponse, type NextRequest } from "next/server"
import { HttpStatusCode } from "axios"
import _ from "lodash"
import { getServerSession } from "next-auth"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { getErrorMessage } from "@/lib/exceptions/errors"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest): Promise<NextResponse> {
  const schema = z.object({
    name: z.string().min(3).max(50),
  })

  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized Request" },
        { status: HttpStatusCode.Unauthorized }
      )
    }

    const data = schema.parse(await req.json())

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
    return NextResponse.json({ data: createdWorkspace })
  } catch (error) {
    console.log(error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues },
        { status: HttpStatusCode.UnprocessableEntity }
      )
    }

    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: HttpStatusCode.InternalServerError }
    )
  }
}

// this api is used for geting all workspace  by user id for zustland store

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized Request" },
        { status: HttpStatusCode.Unauthorized }
      )
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
    }))

    const data = workspaceData.length > 0 ? workspaceData : null

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: HttpStatusCode.InternalServerError }
    )
  }
}
