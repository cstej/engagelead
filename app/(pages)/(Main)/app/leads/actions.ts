"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function assignLeadToUser(leadId: string, userId: string) {
  const lead = await prisma.lead.update({
    where: { id: leadId },
    data: {
      assignedTo: userId,
    },
  })

  revalidatePath("/app/leads")
}
