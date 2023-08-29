import { prisma } from "@/lib/prisma"
import { workspaceWithMembersSchema } from "@/lib/zodSchemas"
import { z } from "zod"

export const getWorkpsaceWithMemebers = async (workspaceId: string) => {

  return await prisma.workspace
    .aggregateRaw({
      pipeline: [
        {
          $match: { _id: { $oid: workspaceId } },
        },
        {
          $lookup: {
            from: "WorkspaceMember",
            localField: "_id",
            foreignField: "workspaceId",
            as: "members",
          },
        },
        {
          $unwind: "$members",
        },
        {
          $lookup: {
            from: "User",
            localField: "members.userId",
            foreignField: "_id",
            as: "members.user",
          },
        },
        {
          $unwind: "$members.user",
        },
        {
          $project: {
            id: { $toString: "$_id" },
            name: 1,
            "members.user": {
              id: { $toString: "$members._id" },
              userId: { $toString: "$members.user._id" },
              email: "$members.user.email",
              emailVerified: { $ifNull: ["$members.user.emailVerified", null] },
              name: "$members.user.name",
              image: { $ifNull: ["$members.user.image", null] },
            },
            "members.role": 1,
          },
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            members: {
              $push: {
                $mergeObjects: ["$members.user", { role: "$members.role" }],
              },
            },
          },
        },
        {
          $project: {
            _id: 0, 
            id: {$toString: "$_id"},
            name: 1,
            members: 1,
          },
        },
      ],
    })
    .then((result) => result[0] as z.infer<typeof workspaceWithMembersSchema>)
}
