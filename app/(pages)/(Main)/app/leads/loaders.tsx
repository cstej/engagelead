import { getErrorMessage } from "@/lib/exceptions/errors"
import { prisma } from "@/lib/prisma"
import { getCurrentUserAndWorkspace } from "@/lib/sessions"

export async function getLeads() {
  try {
    const uw = await getCurrentUserAndWorkspace()

    if (!uw) {
      return { message: "Not Authorized" }
    }

    const leads = await prisma.lead.findMany()

    return { data: leads }
  } catch (error) {
    return { message: getErrorMessage(error) }
  }
}
