import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { add } from "date-fns";

import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import AcceptInviteCard from "./AcceptInviteCard";

export default async function AcceptInvitePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const token = searchParams.token;

  if (!token) {
    return <InvalidTokenPage />;
  }

  const dbtoken = await prisma.inviteToken.findUnique({
    where: { token: token as string, expires: { gte: new Date() } },
  });

  const user = await prisma.user.findUnique({ where: { email: dbtoken?.email } });

  const workspace = await prisma.workspace.findUnique({ where: { id: dbtoken?.workspaceId } });

  const workspaceMember = await prisma.workspaceMember.findFirst({
    where: { userId: user?.id, workspaceId: workspace?.id },
  });

  if (!dbtoken || !user || !workspace || workspaceMember) {
    return <InvalidTokenPage />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <main className="flex-1">
        <section className="container flex h-screen flex-col items-center justify-center">
          <h1 className="mb-10 text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
            Accept Invitation
          </h1>

          <div className="flex flex-col items-center">
            <AcceptInviteCard/>

            </div>
        </section>
      </main>
    </div>
  );
}

function InvalidTokenPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <main className="flex-1">
        <section className="container flex h-screen flex-col items-center justify-center">
          <div className="flex flex-col items-center">
            <AlertCircle className="mb-4 text-6xl text-red-500" />

            <h1 className="mb-2 text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
              Invalid Token
            </h1>
            <p className="text-center text-lg text-gray-500">
              The token you provided is invalid or has expired. Please try again
              with a valid token.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}