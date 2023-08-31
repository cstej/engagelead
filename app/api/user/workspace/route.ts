import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/sessions";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse(null, {
        status: 401,
        statusText: "Unauthorized",
      });
    }

    const workspace = await prisma.workspaceMember.findFirst({
      where: {
        userId: user.id,
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
    });

    if (!workspace) {
      return new NextResponse(null, {
        status: 404,
        statusText: "Not Found",
      });
    }

    return NextResponse.json(workspace.workspace);
  } catch (error) {
    console.error("Error getting workspace:", error);
    return new NextResponse(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}