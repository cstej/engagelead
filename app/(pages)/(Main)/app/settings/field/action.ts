"use server"

import { prisma } from "@/lib/prisma"
import { getCurrentUserAndWorkspace } from "@/lib/sessions"
import { revalidatePath } from "next/cache"

export async function AddFieldDefination(data: {
  fieldName: string
  fieldType: string
}) {
  const uw = await getCurrentUserAndWorkspace()
  if (!uw) throw new Error("User not found")

  const name = data.fieldName.toLowerCase().replace(/\s+/g, '_').trim();

   await prisma.fieldDefinition.create({
    data: {
      name: name,
      type: data.fieldType,
      label: data.fieldName,
      workspaceId: uw.workspaceId,
    },
  })

  revalidatePath("/app/settings/field")

}

export async function UpdateFieldDefination(data: {
  id: string
  fieldName: string
  fieldType: string
}) {
  const uw = await getCurrentUserAndWorkspace()
  if (!uw) throw new Error("User not found")

  const name = data.fieldName.toLowerCase().replace(/\s+/g, '_').trim();

   await prisma.fieldDefinition.update({
    where: {
      id: data.id,
    },
    data: {
      name: name,
      label: data.fieldName,
    },


  })

  revalidatePath("/app/settings/field")
}

export async function DeleteFieldDefination(id: string) {

  const uw = await getCurrentUserAndWorkspace()
  if (!uw) throw new Error("User not found")
  

  await prisma.fieldDefinition.delete({
    where: {
      id: id,
    },
  })

  revalidatePath("/app/settings/field")

}
