import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

async function POST(
  req: NextRequest,
  { params }: { params: { worspaceId: string } }
) {

    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse(null, {
        status: 401,
        statusText: "Unauthorized",
      })
    }


    


}
