import { Role } from "@prisma/client";
import { z } from "zod";


export const memberSchema = z.object({
    id: z.string(),
    email: z.string(),
    emailVerified: z.string().nullable(),
    name: z.string().min(2),
    image: z.string().nullable(),
    role: z.enum([Role.ADMIN, Role.SALES_AGENT, Role.MANAGER]),

});


export const workspaceWithMembersSchema = z.object({
    id: z.string(),
    name: z.string().min(2),
    members: z.array(memberSchema),
});


