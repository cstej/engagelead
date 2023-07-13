import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";



export async function DELETE(req: NextRequest, { params }: { params: { leadId: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse(null, {
        status: 401,
        statusText: "Unauthorized",
      })
    }
    const lead = await prisma.lead.delete({
      where:{
        id: params.leadId
      }
    })

  return NextResponse.json({lead})

  } catch (error) {
    
  }

}