import { prisma } from "@/lib/prisma"
import { getCurrentUserAndWorkspace } from "@/lib/sessions"

export const getAllFieldDefinitions = async () => {
  const uw = await getCurrentUserAndWorkspace()
  if (!uw) throw new Error("User not found")

  const fieldDefinitions = await prisma.fieldDefinition.findMany({
    where: {
      workspaceId: uw.workspaceId,
    },
  })

    return fieldDefinitions
}
