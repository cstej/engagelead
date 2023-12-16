"use client"

import React from "react"
import { Search, UserPlus } from "lucide-react"
import { z } from "zod"

import { memberSchema } from "@/lib/zodSchemas"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/components/providers/trpc-react"
import MemberInviteModal from "@/components/settings/workspace/form/MemberInviteModal"
import { UserAvatar } from "@/app/(pages)/(Main)/app/_components/user-avatar"

const MemberAction = React.lazy(() => import("./member-action"))

const ManageWorkspaceMembers = () => {
  const { data: workspaceMembers, isLoading } =
    api.workspace.getMembersWithRole.useQuery(undefined, {})
  return (
    <Card className="relative overflow-hidden shadow-none">
      <CardHeader className=" border-b">
        <CardTitle>Manage Team</CardTitle>
        <CardDescription className="hidden md:block">
          Manage your team and their respective roles within the workspace.
        </CardDescription>
      </CardHeader>

      <CardContent className="my-4 space-y-4">
        <form className="flex w-full gap-4">
          <div className="grow">
            <Input
              prefix={<Search className="h-4 w-4" />}
              placeholder="Search"
              className="h-9"
            />
          </div>

          <MemberInviteModal>
            <Button className="w-fit" variant={"outline"}>
              <UserPlus className="mr-2 h-4 w-4" />
              Invite
            </Button>
          </MemberInviteModal>
        </form>

        <>
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <MemberCardSkeleton key={i} />
              ))
            : workspaceMembers?.map((member) => (
                <MemberCard key={member.memberId} member={member} />
              ))}
        </>
      </CardContent>
    </Card>
  )
}

export default ManageWorkspaceMembers

type MemberCardProps = {
  member: z.infer<typeof memberSchema>
}

function MemberCard({ member }: MemberCardProps) {
  const { name, image, email, role } = member
  return (
    <Card className="rounded-md">
      <CardContent className="flex flex-col items-center justify-between p-4 sm:flex-row">
        <div className="flex items-center gap-4 ">
          <UserAvatar
            user={{
              name: name,
              image: image || "",
            }}
            className="h-8 w-8"
          />

          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold capitalize">{name}</span>
            </div>
            <div className="flex items-center">
              <span className="truncate text-sm text-muted-foreground">
                {email}
              </span>
              <span className="text-default mx-2 block">•</span>
              <Badge variant="outline" className="text-[10px] capitalize">
                {role}
              </Badge>
            </div>
          </div>
        </div>
        <Separator className="my-2  sm:hidden" />
        <div>
          <React.Suspense fallback={<Skeleton className="h-8 w-8" />}>
            <MemberAction member={member} key={member.memberId} />
          </React.Suspense>
        </div>
      </CardContent>
    </Card>
  )
}

function MemberCardSkeleton() {
  return (
    <Card className="rounded-md">
      <CardContent className="flex flex-col items-center justify-between p-4 sm:flex-row">
        <div className="flex items-center gap-4 ">
          <Skeleton className="h-8 w-8 rounded-full" />

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-4">
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="flex items-center">
              <Skeleton className="h-5 w-52" />
            </div>
          </div>
        </div>
        {/* <Separator className="my-2 sm:hidden" /> */}
        {/* <div>
          <Skeleton className="h-5 w-10" />
        </div> */}
      </CardContent>
    </Card>
  )
}
