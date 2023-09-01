import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getCurrentUserAndWorkspace } from "@/lib/sessions"
import { getErrorMessage } from "@/lib/exceptions/errors"

const createLeadSchema = z.object({
  name: z.string().min(2).max(50).trim(),
  email: z.string().email().toLowerCase().trim(),
  phone: z.string().max(10).trim(),
  lead_source: z.string(),
  lead_status: z.string(),
  assigned_to: z.string(),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse(null, {
        status: 401,
        statusText: "Unauthorized",
      })
    }

    const data = createLeadSchema.parse(await req.json())

    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        lead_source: data.lead_source,
        lead_status: data.lead_status,
        assigned_to: data.assigned_to,
      },
    })
    return new NextResponse(JSON.stringify({ data: lead }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })
    }
  }
}

export async function GET(req: NextRequest) {
  try {
    const uw = await getCurrentUserAndWorkspace()

    if (!uw) {
      return NextResponse.json({ message: "Not Authorized" }, { status: 401, })
    }

    const leads = await prisma.lead.findMany()
    return NextResponse.json({data: leads}, { status: 200, })
  } catch (error) {
    return NextResponse.json({message: getErrorMessage(error)}, { status: 500, })
}}
