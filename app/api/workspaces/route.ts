import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Define a schema for workspace creation data
const createWorkspaceSchema = z.object({
  name: z.string().min(2).max(50)
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(null, {
        status: 401,
        statusText: "Unauthorized",
      });
    }

    const data = createWorkspaceSchema.parse(await req.json());
   

    const workspace = await prisma.workspace.create({
      data: {
        name : data.name,
        users: {
          connect: { id: session.user.id },
        },
      },
    });

    return new NextResponse(JSON.stringify({ data: workspace }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {

    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })
    }
  }
}
