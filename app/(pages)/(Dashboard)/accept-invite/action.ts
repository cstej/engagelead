"use server"

import { getErrorMessage } from "@/lib/exceptions/errors"
import { prisma } from "@/lib/prisma"

export async function AcceptInvitation(token: string) {
  try {
    const dbtoken = await prisma.inviteToken.findUnique({
      where: { token: token as string, expires: { gte: new Date() } },
    })

    const user = await prisma.user.findUnique({
      where: { email: dbtoken?.email },
    })

    const workspace = await prisma.workspace.findUnique({
      where: { id: dbtoken?.workspaceId },
    })

    const workspaceMember = await prisma.workspaceMember.findFirst({
      where: { userId: user?.id, workspaceId: workspace?.id },
    })

    if (!dbtoken || !user || !workspace || workspaceMember) {
      return {
        error: "Invalid token",
      }
    }


    const newWorkspaceMember = await prisma.workspaceMember.create({
        data: {
            userId: user.id,
            workspaceId: workspace.id,
            role: dbtoken.role,
        },
    })

    const deleteToken = await prisma.inviteToken.delete({
        where: { id: dbtoken.id },
    })
    



  } catch (error) {
    console.log(error)
    return {
      error: getErrorMessage(error),
    }
  }
}
