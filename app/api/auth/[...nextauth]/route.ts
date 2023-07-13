import { authOptions } from "@/lib/auth";
import NextAuth, { User } from "next-auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
