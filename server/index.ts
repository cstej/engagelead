// import { z } from "zod"

import { leadRouter } from "./routers/lead";
import { workspaceRouter } from "./routers/workspace";
import { createTRPCRouter } from "./trpc"

export const appRouter = createTRPCRouter({
    lead: leadRouter,
    workspace: workspaceRouter,
 
});


export type AppRouter = typeof appRouter
