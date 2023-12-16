import { leadRouter } from "./routers/lead";
import { userRouter } from "./routers/user";
import { workspaceRouter } from "./routers/workspace";
import { createTRPCRouter } from "./trpc"

export const appRouter = createTRPCRouter({
    lead: leadRouter,
    workspace: workspaceRouter,
    user: userRouter,
 
});


export type AppRouter = typeof appRouter
