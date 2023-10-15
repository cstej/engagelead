import { TRPCError } from "@trpc/server"
import _ from "lodash"

import { getErrorMessage } from "@/lib/exceptions/errors"
import { prisma } from "@/lib/prisma"
import {Ctx}  from "@/types"
import { cookies } from "next/headers"

export const getAllWorkSpaceByUser = async ({
  ctx,
} :{
  ctx: Ctx
}) => {
  try {
    const workspace = await prisma.workspaceMember.findMany({
      where: {
        userId: ctx.userId,
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
    })

    return _.map(workspace, (item) => ({
      id: _.get(item, "workspace.id"),
      name: _.get(item, "workspace.name"),
    }))
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: getErrorMessage(error),
    })
  }
}

export const switchWorkspace = async ({ctx, input}:{
  ctx: Ctx
  input: {
    id: string
    name: string
  }
}) => {

  try {
    // const workspace = await prisma.workspace.findUnique({
    //   where: {
    //     id: ctx.workspaceId
    //   },
    //   select: {
    //     id: true,
    //     name: true,
    //   },
    // })
const Cookie = cookies()

    return Cookie.set("workspace", JSON.stringify(input))

  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: getErrorMessage(error),
    })
  }
}
