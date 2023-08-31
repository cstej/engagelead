import { cookies } from "next/headers"
import { getServerSession } from "next-auth"

import { authOptions } from "./auth"
import { prisma } from "./prisma"

export function getSession() {
  return getServerSession(authOptions)
}

export async function getCurrentUser() {
  const session = await getSession()
  return session?.user
}

export async function getCurrentWorkspace() {
  const Cookies = cookies()

  const workspace = Cookies.get("workspace")?.value

  if (workspace) {
    return JSON.parse(workspace)
  } else {
    return null
  }
}

export async function getCurrentUserAndWorkspace() {
  const user = await getCurrentUser()
  const workspace = await getCurrentWorkspace()

  if (!user || !workspace) {
    return null
  }

  const uw = await prisma.workspaceMember.findFirst({
    where: {
      userId: user.id,
      workspaceId: workspace.id,
    },
    select: {
      role: true,
      workspace: {
        select: {
          name: true,
        },
      },
    },
  })

  if (uw) {
    return {
      userId: user.id,
      userName: user.name,
      emailVerified: user.emailVerified,
      email: user.email,
      workspaceId: workspace.id,
      role: uw.role,
      workspaceName: uw.workspace.name,
    }as {
      userId: string;
      userName: string;
      emailVerified: Date;
      email: string;
      workspaceId: string;
      role: string;
      workspaceName: string;
    }
  }
  return null
}
