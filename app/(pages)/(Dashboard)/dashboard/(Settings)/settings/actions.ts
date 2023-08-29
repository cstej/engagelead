"use server"

import { revalidatePath } from "next/cache"
import { Prisma, Role } from "@prisma/client"
import { add } from "date-fns"
import jwt from "jsonwebtoken"

import { sendEmail } from "@/lib/email"
import { getErrorMessage } from "@/lib/exceptions/errors"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/sessions"

/**
 * Updates the name of a workspace.
 * @param data An object containing the workspace ID and new name.
 * @returns An object containing the updated workspace, or an error if the workspace is not found.
 */
export async function updateWorkspace(data: any) {
  try {
    const user = getCurrentUser()
    if (!user) return null

    // Find the workspace with the specified ID.
    const workspace = await prisma.workspace.findUnique({
      where: { id: data.id },
    })

    // If the workspace is not found, return an error.
    if (!workspace) {
      return {
        error: "Workspace not found",
      }
    }

    // Update the name of the workspace.
    const update = await prisma.workspace.update({
      where: { id: data.id },
      data: {
        name: data.name,
      },
    })
  } catch (error) {
    console.log(error)
    return {
      error: getErrorMessage(error),
    }
  }

  // Invalidate the cache for the workspace settings page.
  revalidatePath("/dashboard/settings/workspace")
}

/**
 * Updates the role of a member in a workspace.
 * @param data An object containing the workspace ID, member ID, and new role.
 * @returns An object containing the updated workspace member, or an error if the member or workspace is not found.
 */

interface MemberUpdate {
  id: string
  role: Role
  workspaceId: string
}

export async function updateMemberRole(data: MemberUpdate) {
  try {
    const user = getCurrentUser()
    if (!user) return null

    // Find the workspace with the specified ID and include its members.
    const workspace = await prisma.workspace.findUnique({
      where: { id: data.workspaceId },
      include: { members: true },
    })

    // Find the member with the specified ID in the workspace.
    const member = workspace?.members.find((m) => m.id === data.id)

    // If the member is not found, return an error.
    if (!member) {
      return {
        error: "Member not found",
      }
    }

    // Update the role of the member in the workspace.
    const update = await prisma.workspace.update({
      where: { id: data.workspaceId },
      data: {
        members: {
          update: {
            where: { id: data.id },
            data: {
              role: data.role,
            },
          },
        },
      },
    })
  } catch (error) {
    console.log(error)
    return {
      error: getErrorMessage(error),
    }
  }

  // Invalidate the cache for the workspace settings page.
  revalidatePath("/dashboard/settings/workspace")
}

export async function inviteMember(data: {
  email: string
  workspaceId: string
  role: Role
}) {
  try {
    console.log(data)
    const user = getCurrentUser()
    if (!user) return null

    // Find the workspace with the specified ID and include its members.
    const workspace = await prisma.workspace.findUnique({
      where: { id: data.workspaceId },
      include: {
        members: {
          include: { user: true },
        },
      },
    })

    if (!workspace) {
      return {
        error: "Workspace not found",
      }
    }

    // Find the member with the specified email in the workspace.
    const member = workspace?.members.find((m) => m.user.email === data.email)

    if (member) {
      return {
        error: "Member already exists in workspace",
      }
    }

    // create jwt token for invite member from data

    const secret = process.env.INVITE_JWT_SECRET

    const token = jwt.sign(
      { email: data.email, workspaceId: data.workspaceId, role: data.role },
      secret!,
      { expiresIn: "2d" }
    )

    const expires = add(new Date(), { days: 2 })

    //create token for invite member
    const inviteToken = await prisma.inviteToken.create({
      data: {
        workspaceId: data.workspaceId,
        email: data.email,
        role: data.role,
        token: token,
        expires: expires.toISOString(),
      },
    })

    

    // send email to invite member

    const emailData = {
      from: process.env.SMTP_FROM_EMAIL!,
      to: data.email,
      subject: `You have been invited to join ${workspace?.name} on ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      html: `
      <p>You have been invited to join ${workspace?.name} on ${process.env.NEXT_PUBLIC_SITE_NAME}.</p>
      <p>Click <a href="${process.env.NEXT_PUBLIC_APP_URL}/accept-invite?token=${token}">here</a> to accept the invite.</p>
      `,
    }

     sendEmail(emailData)

  } catch (error) {
    console.log(error)
    return {
      error: getErrorMessage(error),
    }
  }
}
