import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { getErrorMessage } from "@/lib/exceptions/errors"
import { prisma } from "@/lib/prisma"
import { getCurrentUserAndWorkspace } from "@/lib/sessions"
import { HttpStatusCode } from "axios"

const createLeadSchema = z.object({
  name: z.string().min(2).max(50).trim(),
  email: z.string().email().toLowerCase().trim(),
  phone: z.string().max(10).trim(),
  leadSource: z.string(),
  leadStatus: z.string(),
  assignedTo: z.string(),
  customFields: z.record(z.unknown()).optional(),
})

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions)
    const uw = await getCurrentUserAndWorkspace()
    if (!session || !uw) {
      return NextResponse.json({ message: "Unauthorized Request" }, { status: HttpStatusCode.Unauthorized })
    }

    const data = createLeadSchema.parse(await req.json())

    const customFields = data.customFields
      ? Object.entries(data.customFields).map(([fieldDefinitionId, value]) => ({
          fieldDefinition: {
            connect: {
              id: fieldDefinitionId,
            },
          },
          value: value as string,
        }))
      : []

    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        leadSource: data.leadSource,
        leadStatus: data.leadStatus,
        assignedTo: data.assignedTo,
        createdById: session.user.id,
        workspaceId: uw.workspaceId,
        customFields: {
          create: customFields,
        },
      },
    })

    return NextResponse.json({ lead }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: HttpStatusCode.UnprocessableEntity })
    }

    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: HttpStatusCode.InternalServerError }
    )
  }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const uw = await getCurrentUserAndWorkspace()

    if (!uw) {
      return NextResponse.json({ message: "Unauthorized Request" }, { status: HttpStatusCode.Unauthorized })
    }

    const leads = await prisma.lead.findMany()
    return NextResponse.json({ data: leads },)
  } catch (error) {
    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: HttpStatusCode.InternalServerError }
    )
  }
}