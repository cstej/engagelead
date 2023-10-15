import { z } from "zod"

import { getAllLeads } from "./controllers/lead.controller"
import {
  getAllWorkSpaceByUser,
  switchWorkspace,
} from "./controllers/workspace.controller"
import { authProcedure, router } from "./trpc"

export const appRouter = router({
  allLead: authProcedure.query(async ({ ctx }) => getAllLeads({ ctx })),
  allWorkspaceByUser: authProcedure.query(async ({ ctx }) => {
    return getAllWorkSpaceByUser({ ctx })
  }),
  switchWorkspace: authProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return switchWorkspace({ ctx, input })
    }),
})

export type AppRouter = typeof appRouter
