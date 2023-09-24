import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/sessions";
import { getErrorMessage } from "@/lib/exceptions/errors";

export async function GET(req: NextRequest,) : Promise<NextResponse> {
  try {
    const user = await getCurrentUser();
    if (!user) {
     return NextResponse.json({ message: "Unauthorized Request" }, { status: 401 })
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
      return NextResponse.json({ message: "No workspace found" }, { status: 404 });
    }

    return NextResponse.json(workspace.workspace);
  } catch (error) {
    console.error("Error getting workspace:", error);
    return NextResponse.json({ message: getErrorMessage(error) }, { status: 500 });
  }
}